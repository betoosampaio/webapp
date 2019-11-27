import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ListaPagamentos extends Component {

  columns = [
    {
      Header: 'Data',
      accessor: "data_incluiu",
      headerClassName: "text-left",
      Cell: props => <span>{new Date(props.value).toLocaleString()}</span>
    },
    {
      Header: 'Forma',
      accessor: "ds_forma_pagamento",
      headerClassName: "text-left",
    },
    {
      Header: 'Valor',
      accessor: "valor",
      headerClassName: "text-left",
      Cell: props => <span>{this.moneyFormat(props.value)}</span>
    }
  ]

  constructor(props) {
    super(props);
    this.state = {};
  }

  moneyFormat = (valor) => {
    if (valor)
      return `R$ ${valor.toFixed(2)}`;
    else
      return valor;
  }

  render() {
    let pagamentos = this.props.pagamentos || [];
    return (
      <div>
        <Card>
          <CardHeader><i className='fa fa-dollar' /> Pagamentos
          </CardHeader>
          <CardBody>
            <ReactTable
              data={pagamentos}
              columns={this.columns}
              minRows={0}
              previousText="Anterior"
              nextText="Próxima"
              noDataText="Nenhum registro encontrado"
              pageText="Página"
              ofText="de"
              rowsText="registros"
              loadingText="Carregando..."
              className="table" />
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default ListaPagamentos;