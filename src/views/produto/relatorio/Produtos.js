import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, Button, FormGroup, Label, InputGroup, InputGroupAddon,
  InputGroupText, Collapse, Form
} from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import alasql from 'alasql';
class Produtos extends Component {

  columns = [
    {
      Header: 'Número Mesa',
      accessor: "numero",
      filterable: true,
      headerClassName: "text-left",
    },
    {
      Header: 'Data Inclusão',
      accessor: "data_incluiu",
      headerClassName: "text-left",
      filterable: true,
      Cell: props => <span>{this.dateFormat(props.original.data_incluiu)}</span>
    },
    {
      Header: 'Produto',
      accessor: 'nome_produto',
      filterable: true,
      headerClassName: "text-left",
    },
    {
      Header: 'Quantidade',
      accessor: 'quantidade',
      filterable: true,
      headerClassName: "text-left",
    },
    {
      Header: 'Preço',
      accessor: 'preco',
      filterable: true,
      headerClassName: "text-left",
    },
    {
      Header: 'Acessar Mesa',
      accessor: '_id',
      headerClassName: "text-left",
      sortable: false,
      Cell: props =>
        <Link to={{ pathname: `/mesas/detalhemesa/${props.value}` }}>
          <Button color="secondary" size="sm">
            <i className="fa fa-reply"></i>
          </Button>
        </Link>
    },
  ]

  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      dtini: new Date(),
      dtfim: new Date(),
      showFiltros: true,
      visaoGrafico: "qtd",
    };
  }

  componentDidMount() {
    this.obterDados();
  }

  obterDados = async () => {
    let params = {
      dtini: moment(this.state.dtini).format('YYYY-MM-DDT00:00:00.000Z'),
      dtfim: moment(this.state.dtfim).format('YYYY-MM-DDT23:59:59.999Z'),
    }
    let dados = await serverRequest.request('/mesa/consultar', params);
    if (dados) {

      let produtos = [];
      dados.forEach(r => {
        r.produtos.forEach(p => {
          p._id = r._id;
          p.numero = r.numero;
          produtos.push(p);
        })
      });

      this.setState({ produtos: produtos });
    }
  }

  consultar = async (event) => {
    event.preventDefault();
    this.obterDados();
  }

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;
  }

  render() {

    let query = `
    select 
      nome_produto, 
      sum(quantidade) qtd,
      sum(preco) vlr
    from 
      ?
    group by
      nome_produto`;
    let dados = alasql(query, [this.state.produtos]);

    let options = {
      chart: {
        type: 'column',
        height: 300,
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: dados.map(r => r.nome_produto),
      },
      yAxis: {
        visible: false,
      },
      legend: {
        enabled: false,
      },
      series: {
        name: 'Quantidade',
        data: dados.map(r => r[this.state.visaoGrafico]),
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      credits: false,
    }

    return (
      <div>
        <Card>
          <CardHeader>
            <i className='fa fa-calendar' />Período
              <div className="card-header-actions">
              <div onClick={() => { this.setState({ showFiltros: !this.state.showFiltros }); }}>
                <Button size="sm" color="secondary">
                  <i className={this.state.showFiltros ? "fa fa-caret-up" : "fa fa-caret-down"} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <Collapse isOpen={this.state.showFiltros}>
            <CardBody>
              <Form inline onSubmit={this.consultar}>
                <FormGroup className="mr-3">
                  <Label className="mr-2">Data Inicial:</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="icon-calendar"></i></InputGroupText>
                    </InputGroupAddon>
                    <DatePicker
                      className="form-control w-100"
                      selected={this.state.dtini}
                      onChange={date => this.setState({ dtini: date })}
                      dateFormat="dd/MM/yyyy" />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mr-3">
                  <Label className="mr-2">Data Final:</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="icon-calendar"></i></InputGroupText>
                    </InputGroupAddon>
                    <DatePicker
                      className="form-control"
                      selected={this.state.dtfim}
                      onChange={date => this.setState({ dtfim: date })}
                      dateFormat="dd/MM/yyyy" />
                  </InputGroup>
                </FormGroup>
                <Button type="submit" className="ml-auto" color="success"><i className="fa fa-search mr-1"></i>Consultar</Button>
              </Form>
            </CardBody>
          </Collapse>
        </Card>

        <Card>
          <CardHeader>
            <i className='icon-chart' />Produtos
            <select
              className="small pull-right"
              value={this.state.visaoGrafico}
              onChange={(e) => this.setState({ visaoGrafico: e.target.value })}>
              <option value="qtd">Quantidade</option>
              <option value="vlr">Valor</option>
            </select>
          </CardHeader>
          <CardBody>
            <HighchartsReact
              highcharts={Highcharts}
              options={options} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <i className='icon-tag' />Produtos
          </CardHeader>
          <CardBody>
            <ReactTable
              data={this.state.produtos}
              columns={this.columns}
              minRows={0}
              previousText="Anterior"
              nextText="Próxima"
              noDataText="Nenhum registro encontrado"
              pageText="Página"
              ofText="de"
              rowsText="registros"
              loadingText="Carregando..."
              className="table"
            />
          </CardBody>
        </Card>

      </div>
    );
  }
}

export default Produtos;