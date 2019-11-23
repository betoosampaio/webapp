import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Button} from 'reactstrap';

class ListaPagamentos extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader><i className='fa fa-dollar' />Pagamentos
          </CardHeader>
          <CardBody>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </Table>
          </CardBody>
        </Card>       
      </div>
    )
  }
}

export default ListaPagamentos;