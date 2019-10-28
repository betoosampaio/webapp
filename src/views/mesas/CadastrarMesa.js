import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';

class CadastrarMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCadastrado: false,
     
    };
  }



  render() {
    return (

      <form name="form" onSubmit={this.cadastrar}>
        <Card>
          <CardHeader>
            <strong>Cadastrar Operador</strong>
          </CardHeader>
          <CardBody>

            <FormGroup>
              <Label>Nome:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                </InputGroupAddon>

                <Input
                  name="nome_operador"

                  onChange={this.changeInput}
                  required
                  minLength="4"
                  placeholder="Nome do Operador"
                />

              </InputGroup>
            </FormGroup>


          </CardBody>
          <CardFooter>
            <Button type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> Confirmar</Button>
          </CardFooter>
        </Card>

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showCadastrado}
          onHide={() => { this.setState({ showCadastrado: false }) }}
          backdrop='static' >
          <Modal.Header closeButton>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Operador Cadastrado com sucesso! </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" color="success" onClick={() => { window.location.href = '#/operador' }}  >OK</Button>
          </Modal.Footer>
        </Modal>

      </form>

    );
  }
}

export default CadastrarMesa;
