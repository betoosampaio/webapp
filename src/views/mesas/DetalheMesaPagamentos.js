import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Table } from 'reactstrap';

class DetalheMesaPagamentos extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  moneyFormat = (valor) => {
    if (valor)
      return `R$ ${valor.toFixed(2)}`;
    else
      return valor;
  }

  render() {
    const { pagamentos, vlrPagamentos } = this.props;
    return (
      <Card>

        <CardHeader><i className='fa fa-money'></i>
          Pagamentos
                <Button className="pull-right" color="success" size="sm">
            <i className="icon-plus mr-1"></i>Incluir
                </Button>
        </CardHeader>
        <CardBody>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Forma</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {
                pagamentos.map((obj) => {
                  return (
                    <tr key={obj.data_inclusao} style={{ textDecoration: obj.removido ? "line-through" : "none" }}>
                      <td>{obj.ds_forma_pagamento}</td>
                      <td>{this.moneyFormat(obj.valor)}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <b>Total</b>
          <b className="pull-right">{this.moneyFormat(vlrPagamentos)}</b>
        </CardFooter>
      </Card>
    )
  }
}

export default DetalheMesaPagamentos;