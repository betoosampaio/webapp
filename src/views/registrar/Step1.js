import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

import MaskedInput from 'react-text-mask';

const stateName = "Step1";
const path = process.env.REACT_APP_SRV_PATH;

class Step1 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      cpf_administrador: "",
      nome_administrador: "",
      celular: "",
      email: "",

      validacao: {
        celular: { ok: false, msg: '*' },
        email: { ok: false, msg: '*' },
        cpf_administrador: { ok: false, msg: '*' },
        nome_administrador: { ok: false, msg: '*' }
      },
    }

  };




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

  validarCelular = (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 11) {
      msg = 'Celular incompleto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.celular.ok = ok;
    newState.celular.msg = msg;
    this.setState({ validacao: newState });
  }

  validarCPF = (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (!this.testarCPF(val)) {
      msg = 'CPF incorreto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cpf_administrador.ok = ok;
    newState.cpf_administrador.msg = msg;
    this.setState({ validacao: newState });
  }

  testarCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  validarEmail = (event) => {
    let ok = false, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (!/.+@.+\..+/.test(val)) {
      msg = 'Email incorreto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.email.ok = ok;
    newState.email.msg = msg;
    this.setState({ validacao: newState });
  }

  prosseguir = (event) => {
    event.preventDefault();
    this.props.saveValues(stateName, this.state);
    this.props.nextStep();
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }



  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>
        <h4 className="text-center">Dados do Usuário</h4>

        <FormGroup>
          <Label>CPF:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-pencil"></i></InputGroupText>
            </InputGroupAddon>


            <MaskedInput
              name="cpf_administrador"
              value={this.state.cpf_administrador}
              onBlur={this.validarCPF}
              onChange={this.changeInput}
              placeholder='CPF'
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
              guide={true}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.cpf_administrador.msg}</span>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Nome Administrador:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-pencil"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="nome_administrador"
              value={this.state.nome_administrador}
              onChange={this.changeInput}
              onBlur={this.validarCampoVazio}
              placeholder='Nome Administrador'
              name='nome_administrador'
            />
            <span style={{ color: 'red' }}>{this.state.validacao.nome_administrador.msg}</span>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Celular:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-pencil"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput placeholder='Celular'
              name="celular"
              value={this.state.celular}
              onBlur={this.validarCelular}
              onChange={this.changeInput}
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
              guide={true}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.celular.msg}</span>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Email:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-pencil"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="email"
              value={this.state.email}
              onChange={this.changeInput}
              type='text'
              placeholder='E-mail'
              onBlur={this.validarEmail}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.email.msg}</span>

          </InputGroup>
        </FormGroup>

        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step1;
