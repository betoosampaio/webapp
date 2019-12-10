import React, { Component } from 'react';
import { Table } from 'reactstrap';
import alasql from 'alasql';

class ResumoPagamentos extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let dados = this.props.pagamentos || [];

    let query = `
    select 
      ds_forma_pagamento forma,
      sum(valor) valor
    from 
      ?
    group by
      ds_forma_pagamento
    order by
      2 desc`;

    let pagamentos = [];
    if (dados)
      pagamentos = alasql(query, [dados]);

    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Forma</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map(obj => {
            return (
              <tr key={obj.forma || 0}>
                <td>{obj.forma}</td>
                <td>R$ {obj.valor.toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}

export default ResumoPagamentos;