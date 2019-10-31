import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'

class CadastrarMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ds_menu: '',
      validarSeMenuExiste: '',

      validacao: {
        ds_menu: { valid: false, msg: '' },
        validarSeMenuExiste: { valid: false, invalid: false, msg: '' },
      },
    };
  }


  cadastrar = async (event) => {
    event.preventDefault();
    let dados = await serverRequest.request('/menu/cadastrar', this.state);
    if (dados) {
      this.setState({ showCadastrado: true });
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  validarDsMenu = (event) => {
    let valid = false;
    let val = event.target.value;
    if (!val) {
    }
    else {
      valid = false;
    }
    let newState = Object.assign({}, this.state.validacao);
    newState.ds_menu.valid = valid;
    this.setState({ validacao: newState });
  }

  validarSeMenuExiste = async (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Formato incorreto';
    }

    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.validarSeMenuExiste.valid = valid;
    newState.validarSeMenuExiste.invalid = invalid;
    newState.validarSeMenuExiste.msg = msg;
    this.setState({ validacao: newState });

    let dados = await serverRequest.request('/menu/checarSeMenuExiste', { ds_menu: val });
    if (dados.exists) {
      let newState = Object.assign({}, this.state.validacao);
      newState.validarSeMenuExiste.valid = false;
      newState.validarSeMenuExiste.invalid = 'Esta descrição de menu já está sendo utilizada';
      this.setState({ validacao: newState });
    }
  }



  render() {
    return (
      <form name="form" onSubmit={this.cadastrar}>
        <Card>
          <CardHeader>
            <strong>Cadastrar Menu</strong>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label>Nome do menu:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>

                <Input
                  name="ds_menu"
                  value={this.state.ds_menu}
                  onChange={this.changeInput}
                  placeholder="Lanches"
                  onBlur={this.validarSeMenuExiste}
                  valid={this.state.validacao.validarSeMenuExiste.valid}
                  invalid={this.state.validacao.validarSeMenuExiste.invalid}
                  required
                  minLength="3"
                  maaxLenght="100"
                />

                <FormFeedback invalid>{this.state.validacao.validarSeMenuExiste.msg}</FormFeedback>

              </InputGroup>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" className="pull-right" color="success"><i className="fa fa-check"></i>Confirmar</Button>
          </CardFooter>
        </Card>

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showCadastrado}
          onHide={() => { this.setState({ showCadastrado: false }) }}
          backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Menu Cadastrado com sucesso!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" color="success" onClick={() => { window.location.href = '#/cardapio/menu' }}  >Confirmar</Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

export default CadastrarMenu;
