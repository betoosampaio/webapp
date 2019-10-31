import React, { Component } from 'react';
import { Table, Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import SelectProduto from '../../components/SelectProduto';


class DetalheMesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAdicionarItem: false,
      codigo_produto:"",
    };
  }


  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  render() {
    return (
      <div>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalAdicionarItem}
          onHide={() => { this.setState({ modalAdicionarItem: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Adicionar novo item a mesa
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup>
              <Label>Produto:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-list-ul"></i></InputGroupText>
                </InputGroupAddon>
                <SelectProduto name="codigo_produto" value={this.state.codigo_produto} onChange={this.changeInput} required></SelectProduto>
              </InputGroup>
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal>




        <h2>Mesa xxxx
                    <Button className="pull-right" color="success"><i className="fa fa-check"></i> Fechar Mesa</Button>
          <Button className="pull-right margin-right-10" color="danger"><i className="fa fa-remove"></i> Cancelar Mesa</Button>
        </h2>
        <br></br>
        <Card>
          <CardHeader>
            <i className='icon-list'></i>&nbsp; Produtos
                        <div className="card-header-actions">
              <Button onClick={() => this.setState({ modalAdicionarItem: true })} color="success" size="sm">
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
