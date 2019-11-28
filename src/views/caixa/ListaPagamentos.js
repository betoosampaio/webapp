import React, { Component } from 'react';
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
      Cell: props => <span>R$ {props.value.toFixed(2)}</span>
    }
  ]

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let pagamentos = this.props.pagamentos || [];

    return (
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
    )
  }
}

export default ListaPagamentos;