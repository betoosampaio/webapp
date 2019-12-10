import React, { Component } from 'react';
import {
  Button, Card, CardHeader, CardBody, FormGroup, Label, InputGroup, InputGroupAddon,
  InputGroupText, Collapse, Form, CustomInput
} from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import IncluirCaixa from './IncluirCaixa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class ListaCaixa extends Component {

  constructor(props) {
    super(props);

    this.state = {
      caixas: [],
      dtini: new Date(),
      dtfim: new Date(),
      showFiltros: true,
      somenteAberto: true,
    };
  }

  columns = [
    {
      Header: 'Data Abertura',
      accessor: "data_abriu",
      headerClassName: "text-left",
      Cell: props => <span>{new Date(props.value).toLocaleString()}</span>
    },
    {
      Header: 'Número',
      accessor: "numero",
      headerClassName: "text-left",
    },
    {
      Header: 'Status',
      accessor: "aberta",
      headerClassName: "text-left",
      Cell: props => <span>{props.original.status}</span>
    },
    {
      Header: 'Responsável',
      accessor: "nome_operador",
      headerClassName: "text-left",
    },
    {
      Header: 'Acessar',
      accessor: '_id',
      headerClassName: "text-left",
      sortable: false,
      Cell: props =>
        <Link to={{ pathname: `/caixas/detalhe/${props.value}` }}>
          <Button color="secondary" size="sm">
            <i className="fa fa-reply"></i>
          </Button>
        </Link>
    },
  ]

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    if (this.state.somenteAberto) {
      let dados = await serverRequest.request('/caixa/listar');
      if (dados) {
        this.setState({ caixas: dados });
      }

    }

    else {
      let dados = await serverRequest.request('/caixa/consultar', {
        dtini: moment(this.state.dtini).format('YYYY-MM-DDT00:00:00.000Z'),
        dtfim: moment(this.state.dtfim).format('YYYY-MM-DDT23:59:59.999Z'),
      });
      if (dados) {
        this.setState({ caixas: dados });
      }
    }

  }

  caixaAdicionado = () => {
    this.setState({ modalIncluirCaixa: false })
    this.obterLista();
  }

  consultar = async (event) => {
    event.preventDefault();
    this.obterLista();
  }

  changeSwitch = (event) => {
    this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
  }

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className='fa fa-filter' />Filtro
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
                <FormGroup>
                  <Label className="mr-2">Somente caixas abertos:</Label>
                  <CustomInput
                    id="somenteAberto"
                    type="switch"
                    name="somenteAberto"
                    checked={this.state.somenteAberto ? true : false}
                    onChange={this.changeSwitch}
                    valid
                  />
                </FormGroup>
                {!this.state.somenteAberto === true &&
                  <FormGroup className="mr-2">
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
                }
                {!this.state.somenteAberto === true &&
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
                }
                <Button type="submit" className="ml-auto" color="success"><i className="fa fa-search mr-1"></i>Consultar</Button>
              </Form>
            </CardBody>
          </Collapse>
        </Card>
        <p></p>
        <Card>
          <CardHeader>
            <i className='icon-calculator' />Caixas
            <div className="card-header-actions">
              <Button color="success" size="sm" onClick={() => this.setState({ modalIncluirCaixa: true })}>
                <i className="icon-plus mr-1"></i>Abrir Caixa
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={this.state.caixas}
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
        <IncluirCaixa
          show={this.state.modalIncluirCaixa}
          onHide={() => { this.setState({ modalIncluirCaixa: false }) }}
          caixaadicionado={this.caixaAdicionado} />
      </div>
    );
  }
}

export default ListaCaixa;


