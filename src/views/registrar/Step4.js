import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button, FormFeedback } from 'reactstrap';
import { UncontrolledTooltip } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
const stateName = "Step4";


class Step4 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      codigo_restaurante: '',
      login: '',
      senha: '',
      validarSenha: '',

      validacao: {
        codigo_restaurante: { valid: false, invalid: false, msg: '' },
        login: { valid: false, invalid: false, msg: '' },
        senha: { valid: false, invalid: false, msg: '' },
        validarSenha: { valid: false, invalid: false, msg: '' },
      },
    }

  };

  prosseguir = (event) => {
    event.preventDefault();

    let valid = true;
    this.conferirSenha();

    Object.keys(this.state.validacao).forEach(p => {
      if (!this.state.validacao[p].valid) {
        valid = false;
      }
    });

    if (valid) {
      this.props.saveValues(stateName, this.state, () => {
        this.props.cadastrar();
      });
    }
    else
      alert('Preencha todos os campos corretamente');

  }

  retornar = () => {
    this.props.saveValues(stateName, this.state);
    this.props.previousStep();
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  validarCodigoRestaurante = async (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      valid = false;
      invalid = true;
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      valid = false;
      invalid = true;
      msg = 'Deve conter 4 ou mais caracteres';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.codigo_restaurante.valid = valid;
    newState.codigo_restaurante.invalid = invalid;
    newState.codigo_restaurante.msg = msg;
    this.setState({ validacao: newState });

    if (valid) {
      let dados = await serverRequest.request('/restaurante/checarSeCodigoExiste', { codigo_restaurante: val });
      if (dados.exists) {
        let newState = Object.assign({}, this.state.validacao);
        newState.codigo_restaurante.valid = false;
        newState.codigo_restaurante.invalid = true;
        newState.codigo_restaurante.msg = 'Este login já está sendo utilizado';
        this.setState({ validacao: newState });
      }
    }

  }


  validarLogin = (event) => {
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
    newState.login.valid = valid;
    newState.login.invalid = invalid;
    newState.login.msg = msg;
    this.setState({ validacao: newState });
  }

  validarSenha = (event) => {
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
    newState.senha.valid = valid;
    newState.senha.invalid = invalid;
    newState.senha.msg = msg;
    this.setState({ validacao: newState });
  }

  conferirSenha = (event) => {
    let valid = false, invalid = true, msg = '';

    let val = this.state.validarSenha;
    let senha = this.state.senha;

    if (val !== senha) {
      msg = 'Senha não confere';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.validarSenha.valid = valid;
    newState.validarSenha.invalid = invalid;
    newState.validarSenha.msg = msg;
    this.setState({ validacao: newState });
  }

  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>
        <h4 className="text-center">Acesso ao sistema</h4>

        <FormGroup>
          <Label>Login do restaurante:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="codigo_restaurante"
              value={this.state.codigo_restaurante}
              onChange={this.changeInput}
              placeholder="login do restaurante"
              onBlur={this.validarCodigoRestaurante}
              valid={this.state.validacao.codigo_restaurante.valid}
              invalid={this.state.validacao.codigo_restaurante.invalid}
              required
              minLength="4"
              maxLength="255"
              id="informativoCodigo"
            />
            <FormFeedback>{this.state.validacao.codigo_restaurante.msg}</FormFeedback>

            <UncontrolledTooltip placement="top" target="informativoCodigo">
              O login do restaurante deve ser único e sempre será usado para acessar o sistema
           </UncontrolledTooltip>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Login do operador:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="login"
              value={this.state.login}
              onChange={this.changeInput}
              placeholder="Administrador"
              onBlur={this.validarLogin}
              valid={this.state.validacao.login.valid}
              invalid={this.state.validacao.login.invalid}
              required
            />
            <FormFeedback>{this.state.validacao.login.msg}</FormFeedback>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Senha:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              type="password"
              name="senha"
              value={this.state.senha}
              onChange={this.changeInput}
              placeholder="Senha"
              onBlur={this.validarSenha}
              valid={this.state.validacao.senha.valid}
              invalid={this.state.validacao.senha.invalid}
              required
            />
            <FormFeedback>{this.state.validacao.senha.msg}</FormFeedback>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Confirmar Senha:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              type="password"
              name="validarSenha"
              value={this.state.validarSenha}
              onChange={this.changeInput}
              placeholder="Repita a senha"
              onBlur={this.conferirSenha}
              required
              valid={this.state.validacao.validarSenha.valid}
              invalid={this.state.validacao.validarSenha.invalid}
            />
            <FormFeedback>{this.state.validacao.validarSenha.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>


        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button onClick={this.cadastrarRestaurante} type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> FInalizar</Button>

      </Form>
    );
  }
}


export default Step4;
