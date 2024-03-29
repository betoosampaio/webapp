import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button, FormFeedback } from 'reactstrap';
import MaskedInput from '../../components/MaskedInput';

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
        cpf_administrador: { valid: false, invalid: false, msg: '' },
        nome_administrador: { valid: false, invalid: false, msg: '' },
        celular: { valid: false, invalid: false, msg: '' },
        email: { valid: false, invalid: false, msg: '' },
      },
    }

  };

  validarCelular = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 11) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('11111111111')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('22222222222')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('33333333333')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('44444444444')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('55555555555')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('66666666666')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('77777777777')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('88888888888')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('99999999999')) {
      msg = 'Formato inválido';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.celular.valid = valid;
    newState.celular.invalid = invalid;
    newState.celular.msg = msg;
    this.setState({ validacao: newState });
  }

  validarCPF = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 11) {
      msg = 'Formato inválido';
    }
    else if (!this.testarCPF(val)) {
      msg = 'CPF incorreto';
    }
    else if (val.toString().includes('11111111111')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('22222222222')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('33333333333')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('44444444444')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('55555555555')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('66666666666')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('77777777777')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('88888888888')) {
      msg = 'Formato inválido';
    }
    else if (val.toString().includes('99999999999')) {
      msg = 'Formato inválido';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cpf_administrador.valid = valid;
    newState.cpf_administrador.invalid = invalid;
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
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (!/.+@.+\..+/.test(val)) {
      msg = 'Formato inválido';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.email.valid = valid;
    newState.email.invalid = invalid;
    newState.email.msg = msg;
    this.setState({ validacao: newState });
  }

  validarNomeAdmin = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Campo deve conter mais do que 4 caracteres';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.nome_administrador.valid = valid;
    newState.nome_administrador.invalid = invalid;
    newState.nome_administrador.msg = msg;
    this.setState({ validacao: newState });
  }

  prosseguir = (event) => {
    event.preventDefault();

    let valid = true;

    Object.keys(this.state.validacao).forEach(p => {
      if (!this.state.validacao[p].valid) {
        valid = false;
      }
    });

    if (valid) {
      this.props.saveValues(stateName, this.state);
      this.props.nextStep();
    }
    else
      alert('Preencha todos os campos corretamente.');
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
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>


            <MaskedInput
              maxLength="14"
              className="form-control"
              name="cpf_administrador"
              value={this.state.cpf_administrador}
              onBlur={this.validarCPF}
              onChange={this.changeInput}
              placeholder='000.000.000-00'
              mascara="999.999.999-99"
              invalid={this.state.validacao.cpf_administrador.invalid}
              valid={this.state.validacao.cpf_administrador.valid}
              required
            />

            <FormFeedback invalid>{this.state.validacao.cpf_administrador.msg}</FormFeedback>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Nome Administrador:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="nome_administrador"
              value={this.state.nome_administrador}
              onChange={this.changeInput}
              onBlur={this.validarNomeAdmin}
              placeholder='Nome do administrador'
              invalid={this.state.validacao.nome_administrador.invalid}
              valid={this.state.validacao.nome_administrador.valid}
              minLength="4"
              maxLength="255"
              required
            />
            <FormFeedback>{this.state.validacao.nome_administrador.msg}</FormFeedback>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Celular:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-phone"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput
              maxLength="15"
              className="form-control"
              placeholder='(11) 99999-9999'
              name="celular"
              value={this.state.celular}
              onBlur={this.validarCelular}
              onChange={this.changeInput}
              mascara="(99) 99999-9999"
              invalid={this.state.validacao.celular.invalid}
              valid={this.state.validacao.celular.valid}
              required
            />
            <FormFeedback>{this.state.validacao.celular.msg}</FormFeedback>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Email:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-envelope-open"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="email"
              maxLength="255"
              value={this.state.email}
              onChange={this.changeInput}
              type='text'
              placeholder='E-mail'
              onBlur={this.validarEmail}
              required
              invalid={this.state.validacao.email.invalid}
              valid={this.state.validacao.email.valid}
            />
            <FormFeedback>{this.state.validacao.email.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step1;
