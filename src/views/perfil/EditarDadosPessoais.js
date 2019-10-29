import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';

import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import MaskedInput from 'react-text-mask';


class EditarDadosPessoais extends Component {

  constructor(props) {

    super(props);
    this.state = {
      showConfirm: false,
      nome_administrador: "",
      cpf_administrador: "",
      email: "",
      celular: "",
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

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/restaurante/obter', { "id_restaurante": id });
    if (dados) {
      this.setState(dados[0]);
    }
  }

  editar = async (event) => {
    event.preventDefault();

    let obj = {

      cpf_administrador: this.state.cpf_administrador.replace(/\D/g, ''),
      nome_administrador: this.state.nome_administrador,
      celular: this.state.celular.toString().replace(/\D/g, ''),
      email: this.state.email,

    }

    //console.log(obj);

    let dados = await serverRequest.request('/restaurante/editar/dadosPessoais', obj);
    if (dados) {
      window.location.href = '#/perfil';
    }
  }




  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeSwitch = (event) => {
    this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
  }




  render() {
    return (

      <Card>
        <CardHeader>
          <h5><b>Editar dados pessoais</b></h5>
        </CardHeader>
        <CardBody>

          <FormGroup>
            <Label><b>Nome do Administrador: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-user"></i></InputGroupText>
              </InputGroupAddon>

              <Input
                name="nome_administrador"
                value={this.state.nome_administrador}
                onChange={this.changeInput}
                invalid={!this.state.validacao.nome_administrador.ok}
              />

              <FormFeedback invalid>{this.state.validacao.nome_administrador.msg}</FormFeedback>



            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>CPF do Administrador: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-user"></i></InputGroupText>
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
            <Label><b>E-mail do Administrador: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-envelope-open"></i></InputGroupText>
              </InputGroupAddon>

              <Input
                name="email"
                value={this.state.email}
                onChange={this.changeInput}
                type="email"
                onBlur={this.validarEmail}
                required
                invalid={!this.state.validacao.email.ok}
              />
              <FormFeedback invalid>{this.state.validacao.email.msg}</FormFeedback>

            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Celular do Administrador: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-phone"></i></InputGroupText>
              </InputGroupAddon>

              <MaskedInput
                className="form-control"
                placeholder='(11) 99999-9999'
                name="celular"
                onBlur={this.validarCelular}
                value={this.state.celular}
                onChange={this.changeInput}
                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
                guide={true}
              />

              <span style={{ color: 'red' }}>{this.state.validacao.celular.msg}</span>

            </InputGroup>
          </FormGroup>

        </CardBody>
        <Modal.Footer>
          <Button variant="primary" color="danger" onClick={() => { window.location.href = '#/perfil' }} >Cancelar</Button>
          <Button variant="primary" color="success" onClick={this.editar}  >Confirmar</Button>                </Modal.Footer>
      </Card>
    );
  }
}

export default EditarDadosPessoais;