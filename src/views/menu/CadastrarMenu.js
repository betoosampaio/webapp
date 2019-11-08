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
        ds_menu: { valid: false, invalid: false, msg: '' },
      },
    };
  }


  cadastrar = async (event) => {
    event.preventDefault();

    let valid = true;

    Object.keys(this.state.validacao).forEach(p => {
      if (!this.state.validacao[p].valid) {
        valid = false;
      }
    });

    if (!valid) return alert('Preencha todos os campos corretamente');

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
      msg = 'Deve conter mais do que 4 caracteres';
    }

    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.ds_menu.valid = valid;
    newState.ds_menu.invalid = invalid;
    newState.ds_menu.msg = msg;
    this.setState({ validacao: newState });

    let dados = await serverRequest.request('/menu/checarSeMenuExiste', { ds_menu: val });
    if (dados.exists) {
      let newState = Object.assign({}, this.state.validacao);
      newState.ds_menu.valid = false;
      newState.ds_menu.invalid = true;
      newState.ds_menu.msg = 'Esta descrição de menu já está sendo utilizada';
      this.setState({ validacao: newState });
    }
  }

  limparStateMenu = () => {

    this.setState({
      ds_menu: '',
      showCadastrado: false,
      validarSeMenuExiste: '',

      validacao: {
        ds_menu: { valid: false, invalid: false, msg: '' },
      },
    });
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
                  valid={this.state.validacao.ds_menu.valid}
                  invalid={this.state.validacao.ds_menu.invalid}
                  required
                  minLength="3"
                  maxLength="100"
                />

                <FormFeedback>{this.state.validacao.ds_menu.msg}</FormFeedback>

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
            <Button variant="primary" color="success" onClick={this.limparStateMenu}  >Confirmar</Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

export default CadastrarMenu;
