import React, { Component } from 'react';
import { Table, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';

class DetalheMesa extends Component {

    render() {
        return (
            <div>
                <h2>Mesa XXX
                    <Button className="pull-right" color="success"><i className="fa fa-check"></i> Fechar Mesa</Button>
                    <Button className="pull-right margin-right-10" color="danger"><i className="fa fa-remove"></i> Cancelar Mesa</Button>
                </h2>
                <br></br>
                <Card>
                    <CardHeader>
                        <i className='icon-list'></i>&nbsp; Produtos
                        <div className="card-header-actions">
                            <Button color="success" size="sm">
                                <i className="icon-plus"></i>&nbsp;Incluir
                        </Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hamburguer</td>
                                    <td>2</td>
                                    <td>R$ 45,80</td>
                                </tr>
                                <tr>
                                    <td>Refrigerante</td>
                                    <td>3</td>
                                    <td>R$ 24,30</td>
                                </tr>
                                <tr>
                                    <td>Batata Frita</td>
                                    <td>2</td>
                                    <td>R$ 12,00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <th>7</th>
                                    <th>R$ 82,10</th>
                                </tr>
                            </tfoot>
                        </Table>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default DetalheMesa;
