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

class Mesas extends Component {

  columns = [
    {
      Header: 'Data',
      accessor: "data_abriu",
      headerClassName: "text-left",
      Cell: props => <span>{this.dateFormat(props.original.data_abriu)}</span>
    },
    {
      Header: 'Status',
      accessor: "aberta",
      headerClassName: "text-left",
      sortable: false,
      Cell: props => <span>{props.original.status}</span>
    },
    {
      Header: 'Produtos',
      accessor: 'qtd_produtos',
      headerClassName: "text-left",

    },
    {
      Header: 'Valor Total',
      accessor: 'valor_total',
      Cell: props => <span>{props.value.toFixed(2)}</span>,
      headerClassName: "text-left",
    },
    {
      Header: 'Valor Pago',
      accessor: 'valor_pagamentos',
      headerClassName: "text-left",
    },
    {
      Header: 'Acessar',
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
      dados: [],
      dtini: new Date(),
      dtfim: new Date(),
      showFiltros: false,
      filtroStatus: "",
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
      dados.forEach(r => {
        r.valor_total = this.vlrTotal(r);
        r.status = this.statusMesa(r);
      });
      this.setState({ dados: dados, showFiltros: false });
    }
  }

  consultar = async (event) => {
    event.preventDefault();
    this.obterDados();
  }

  statusMesa = (mesa) => {
    let status = "Aberta";
    if (mesa.fechada) status = "Fechada";
    if (mesa.encerrada) status = "Encerrada";
    return status;
  }

  vlrTotal = (mesa) => {
    let vl = (mesa.valor_produtos * (1 + mesa.taxa_servico)) - mesa.desconto;
    return vl;
  }

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;
  }

  render() {

    let dados = this.state.dados
    if (this.state.filtrarStatus) {
      dados = dados.filter(row => String(row.status) === String(this.state.filtrarStatus))
    }


    return (
      <div>
        <Card>
          <CardHeader>
            <i className='fa fa-filter' />Filtros
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
            <i className='icon-grid' />Mesas
            <div className="card-header-actions">
              <Button color="secondary" size="sm"
                onClick={() => this.obterDados()}>
                <i className="fa fa-refresh"></i>
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <FormGroup className="mr-3">
              <Label className="mr-2">Filtrar Status:</Label>
              <select
                value={this.state.filtrarMenu}
                onChange={e => this.setState({ filtrarStatus: e.target.value })}>
                <option value="">Tudo</option>
                <option value="Aberta">Aberta</option>
                <option value="Fechada">Fechada</option>
                <option value="Encerrada">Encerrada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </FormGroup>
            <ReactTable
              data={dados}
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

export default Mesas;