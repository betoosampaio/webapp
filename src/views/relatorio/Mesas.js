import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
    };
  }

  componentDidMount() {
    this.obterDados();
  }

  obterDados = async () => {
    let dados = await serverRequest.request('/mesa/consultar', {
      dtini: "2019-11-15 00:00:00",
      dtfim: "2019-11-15 23:59:59"
    });
    if (dados) {
      dados.forEach(r => r.valor_total = this.vlrTotal(r));
      this.setState({ dados: dados });
    }
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
    return (
      <div>
        <Card>
          <CardHeader>
            <i className='icon-grid'></i>Mesas
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
