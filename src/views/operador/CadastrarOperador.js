import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import SelectPerfil from '../../components/SelectPerfil'
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal';
import PasswordInput from '../../components/PasswordInput';


class CadastrarOperador extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCadastrado: false,
      nome_operador: "",
      id_perfil: "",
      login_operador: "",
      senha_operador: "",

      validacao: {
        nome_operador: { valid: false, invalid: false, msg: '' },
        id_perfil: { valid: false, msg: '' },
        login_operador: { valid: false, invalid: false, msg: '' },
        senha_operador: { valid: false, invalid: false, msg: '' },
      },
    };
  }



  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  validarNomeOperador = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Campo deve conter 4 caracteres ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.nome_operador.valid = valid;
    newState.nome_operador.invalid = invalid;
    newState.nome_operador.msg = msg;
    this.setState({ validacao: newState });
  }

  validarIdPerfil = (event) => {
    let valid = false;
    let val = event.target.value;
    if (!val) {
    }
    else {
      valid = true;
    }
    let newState = Object.assign({}, this.state.validacao);
    newState.id_perfil.valid = valid;
    this.setState({ validacao: newState });
  }

  validarLoginOperador = async (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Este campo deve conter 4 caracteres ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.login_operador.valid = valid;
    newState.login_operador.invalid = invalid;
    newState.login_operador.msg = msg;
    this.setState({ validacao: newState });

    let dados = await serverRequest.request('/operador/checarSeLoginExiste', { login_operador: val });
    if (dados.exists) {
      let newState = Object.assign({}, this.state.validacao);
      newState.login_operador.valid = false;
      newState.login_operador.invalid = true;
      newState.login_operador.msg = 'Esta login já está sendo utilizado.';
      this.setState({ validacao: newState });
    }
  }

  validarSenhaOperador = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 8) {
      msg = 'Senha deve conter 8 caracteres';
    }
    else if (!(/^(?=.*[a-zA-Z])(?=.*[0-9])/).test(val)) {
      msg = 'Senha deve conter letras e números';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.senha_operador.valid = valid;
    newState.senha_operador.invalid = invalid;
    newState.senha_operador.msg = msg;
    this.setState({ validacao: newState });
  }

  cadastrar = async (event) => {
    event.preventDefault();
    let dados = await serverRequest.request('/operador/cadastrar', this.state);
    if (dados) {
      this.setState({ showCadastrado: true });
    }
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
                  value={this.state.nome_operador}
                  onChange={this.changeInput}
                  onBlur={this.validarNomeOperador}
                  minLength="4"
                  maxLength="255"
                  placeholder="Nome do Operador"
                  invalid={this.state.validacao.nome_operador.invalid}
                  valid={this.state.validacao.nome_operador.valid}
                  required
                />
                <FormFeedback>{this.state.validacao.nome_operador.msg}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Perfil:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-group"></i></InputGroupText>
                </InputGroupAddon>
                <SelectPerfil
                  name="id_perfil"
                  value={this.state.id_perfil}
                  onChange={this.changeInput}
                  onBlur={this.validarIdPerfil}
                  valid={this.state.validacao.id_perfil.valid}
                  required
                >
                </SelectPerfil>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Login:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-id-card"></i></InputGroupText>
                </InputGroupAddon>
                <Input
                  name="login_operador"
                  value={this.state.login_operador}
                  onChange={this.changeInput}
                  minLength="4"
                  maxLength="100"
                  placeholder="Login"
                  onBlur={this.validarLoginOperador}
                  invalid={this.state.validacao.login_operador.invalid}
                  valid={this.state.validacao.login_operador.valid}
                  autocomplete="new-password"
                  required

                />
                <FormFeedback>{this.state.validacao.login_operador.msg}</FormFeedback>
              </InputGroup>
            </FormGroup>


            <FormGroup>
              <Label>Senha:</Label>
                <PasswordInput
                  name="senha_operador"
                  value={this.state.senha_operador}
                  onChange={this.changeInput}
                  placeholder="Senha"
                  minLength="8"
                  onBlur={this.validarSenhaOperador}
                  valid={this.state.validacao.senha_operador.valid}
                  invalid={this.state.validacao.senha_operador.invalid}
                  feedbackMessage={this.state.validacao.senha_operador.msg}
                  autocomplete="new-password"
                  required
                />
                
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

export default CadastrarOperador;
