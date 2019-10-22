import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { UncontrolledTooltip } from 'reactstrap';
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
        codigo_restaurante: { ok: true, msg: '' },
        login: { ok: true, msg: '' },
        senha: { ok: true, msg: '' },
        validarSenha: { ok: true, msg: '' },
      },
    }

  }

  prosseguir = (event) => {
    event.preventDefault();

    let ok = true;

    Object.keys(this.state.validacao).forEach(p => {
      if (!this.state.validacao[p].ok) {
        ok = false;
      }
    });

    if (ok) {
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

  validarCampoVazio = (event) => {
    let ok = false, msg = '';

    if (!event.target.value)
      msg = 'Campo obrigatório';
    else
      ok = true;

    let newState = Object.assign({}, this.state.validacao);
    newState[event.target.name].ok = ok;
    newState[event.target.name].msg = msg;
    this.setState({ validacao: newState });
  }

  validarSenha = (event) => {
    let ok = false, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 8) {
      msg = 'Senha deve conter 8 dígitos';
    }
    else if (!(/^(?=.*[a-zA-Z])(?=.*[0-9])/).test(val)) {
      msg = 'Senha deve conter letras e números';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.senha.ok = ok;
    newState.senha.msg = msg;
    this.setState({ validacao: newState });
  }


  conferirSenha = (event) => {
    let ok = false, msg = '';

    let val = event.target.value;
    let senha = this.state.senha;

    if (val !== senha) {
      msg = 'Senha não confere';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.validarSenha.ok = ok;
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
              placeholder="restaurante_freedapp"
              onBlur={this.validarCampoVazio}
              required
              id="informativoCodigo"
            />
      
           
            <UncontrolledTooltip placement="top" target="informativoCodigo">
             Aqui é Login do restaurante  "Será usado sempre para acessar como Administrador"
           </UncontrolledTooltip>

            <span style={{ color: 'red' }}>{this.state.validacao.codigo_restaurante.msg}</span>

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
              onBlur={this.validarCampoVazio}
              required
            />

            <span style={{ color: 'red' }}>{this.state.validacao.login.msg}</span>

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
              required
            />

            <span style={{ color: 'red' }}>{this.state.validacao.senha.msg}</span>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Validar Senha:</Label>
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
            />

            <span style={{ color: 'red' }}>{this.state.validacao.validarSenha.msg}</span>

          </InputGroup>
        </FormGroup>


        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button onClick={this.cadastrarRestaurante} type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> FInalizar</Button>

      </Form>
    );
  }
}

export default Step4;
