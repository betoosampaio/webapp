import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

import MaskedInput from 'react-text-mask';

const stateName = "Step1";

class Step1 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      cpf_administrador: "",
      nome_administrador: "",
      celular: "",
      email: "",

      validacao: {
        cpf_administrador: { ok: true, msg: '' },
        nome_administrador: { ok: true, msg: '' },
        celular: { ok: true, msg: '' },
        email: { ok: true, msg: '' },    
      },
    }

  };

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
    if (strCPF === "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
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

    for (let v in this.state.validacao) {
      if (!this.state.validacao[v].ok) {
        alert('Preencha todos os campos corretamente');
        return false;
      }
    }

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
              className="form-control"
              name="cpf_administrador"
              value={this.state.cpf_administrador}
              onBlur={this.validarCPF}
              onChange={this.changeInput}
              placeholder='000.000.000-00'
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
              guide={true}
              required
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
              placeholder='Nome do administrador'
              name='nome_administrador'
              required
              minLength="4"
              maxLength="255"
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

            <MaskedInput
              className="form-control"
              placeholder='(11) 98888-9999'
              name="celular"
              value={this.state.celular}
              onBlur={this.validarCelular}
              onChange={this.changeInput}
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
              guide={true}
              required
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
              required
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
