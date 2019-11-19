import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, Button, FormGroup, Label, InputGroup, InputGroupAddon,
  InputGroupText, Row, Col, Collapse
} from 'reactstrap';
import MaskedInput from '../../components/MaskedInput';
import DateRangeInput from '../../components/DateRangeInput';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal'

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
      Cell: props => <span>{this.statusMesa(props.original)}</span>
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
      dtini: moment().format('DD/MM/YYYY'),
      dtfim: moment().format('DD/MM/YYYY'),
      showFiltros: false,
    };
  }

  componentDidMount() {
    this.obterDados();
  }

  obterDados = async () => {
    let params = {
      dtini: moment(this.state.dtini, 'DD/MM/YYYY').format('YYYY-MM-DDT00:00:00.000Z'),
      dtfim: moment(this.state.dtfim, 'DD/MM/YYYY').format('YYYY-MM-DDT23:59:59.999Z'),
    }

    console.log(params);

    let dados = await serverRequest.request('/mesa/consultar', params);
    if (dados) {
      dados.forEach(r => r.valor_total = this.vlrTotal(r));
      this.setState({ dados: dados });
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

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.consultar}>
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
                <Row>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Label>Data Inicial:</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="append">
                          <InputGroupText><i className="icon-calendar"></i></InputGroupText>
                        </InputGroupAddon>
                        <MaskedInput
                          maxLength="14"
                          className="form-control"
                          name="dtini"
                          value={this.state.dtini}
                          onChange={this.changeInput}
                          placeholder='01/01/0001'
                          mascara="99/99/9999"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Label>Data Final:</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="append">
                          <InputGroupText><i className="icon-calendar"></i></InputGroupText>
                        </InputGroupAddon>
                        <MaskedInput
                          maxLength="14"
                          className="form-control"
                          name="dtfim"
                          value={this.state.dtfim}
                          onChange={this.changeInput}
                          placeholder='01/01/0001'
                          mascara="99/99/9999"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <Modal.Footer>
                <Button type="submit" className="ml-auto" color="success"><i className="fa fa-search mr-1"></i>Consultar</Button>
              </Modal.Footer>
            </Collapse>
          </Card>
        </form>

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
            <ReactTable
              data={this.state.dados}
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