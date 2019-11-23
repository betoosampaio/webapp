import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Button } from 'reactstrap';

class ListaLancamentos extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardHeader><i className='fa fa-money' />Lançamentos
        <div className="card-header-actions">
            <Button color="success" size="sm" className="mr-2">
              <i className="icon-plus mr-1"></i>Sangria
              </Button>
            <Button color="danger" size="sm">
              <i className="icon-plus mr-1"></i>Suprimento
              </Button>
          </div>
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
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}

export default ListaLancamentos;