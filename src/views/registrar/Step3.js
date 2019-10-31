import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button, FormFeedback } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import SelectBanco from '../../components/SelectBanco';
import { AppSwitch } from '@coreui/react';
import serverRequest from '../../utils/serverRequest';


const stateName = "Step3";

class Step3 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      pagamento_app: 1,
      codigo_banco: "",
      id_tipo_cadastro_conta: "1",
      id_tipo_conta: "",
      agencia: "",
      conta: "",
      digito: "",
      cpfcnpj_conta: "",

      validacao: {
        cpf_administrador: { valid: true, msg: '' },
        cnpj: { valid: true, msg: '' }
      }
    }
  };

  validarCPF = (event) => {
    let valid = false, msg = '';
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
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cpf_administrador.valid = valid;
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

  validarCNPJ = async (event) => {
    let valid = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');

    if (val.length < 14) {
      msg = 'Formato inválido';
    }

    else if (!this.testarCNPJ(val)) {
      msg = 'CNPJ incorreto';
    }

    else {
      valid = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cnpj.valid = valid;
    newState.cnpj.msg = msg;
    this.setState({ validacao: newState });

    if (val.length === 14) {
      let dados = await serverRequest.request('/restaurante/checarSeCNPJExiste', { cnpj: val });
      if (dados.exists) {
        let newState = Object.assign({}, this.state.validacao);
        newState.cnpj.valid = false;
        newState.cnpj.msg = 'Este CNPJ já está cadastrado';
        this.setState({ validacao: newState });
      }
    }

  }

  testarCNPJ = (cnpj) => {

    if (cnpj === '') return false;

    if (cnpj.length !== 14)
      return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999")
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado.toString() !== digitos.charAt(0))
      return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado.toString() !== digitos.charAt(1))
      return false;

    return true;
  }



  prosseguir = (event) => {
    event.preventDefault();
    this.props.saveValues(stateName, this.state);
    this.props.nextStep();
  }

  retornar = () => {
    this.props.saveValues(stateName, this.state);
    this.props.previousStep();
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeSwitch = (event) => {
    this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
  }

  changeMultipleSelect = (event) => {
    this.setState({ [event.target.name]: event.target.value[0] });
  }

  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>
        <h4 className="text-center">Dados Bancários</h4>

        <FormGroup className="mt-4">
          <InputGroup>
            <Label>Aceitar pagamentos pelo App:</Label>

            <AppSwitch
              name="pagamento_app"
              className={'mx-3'}
              variant={'pill'}
              color={'success'}
              checked={this.state.pagamento_app ? true : false}
              onChange={this.changeSwitch}
            />

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Instituição: </Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <SelectBanco
              name="codigo_banco"
              value={this.state.codigo_banco}
              onChange={this.changeMultipleSelect}
              disabled={this.state.pagamento_app ? false : true}>
            </SelectBanco>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              type="select"
              name="id_tipo_conta"
              value={this.state.id_tipo_conta}
              onChange={this.changeInput}
              disabled={this.state.pagamento_app ? false : true}>
              <option value="0">Selecione</option>
              <option value="1">Conta Corrente</option>
              <option value="2">Conta Poupança</option>
            </Input>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Agencia:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput
              className="form-control"
              name="agencia"
              placeholder="Agência"
              value={this.state.agencia}
              onChange={this.changeInput}
              mask={[/\d/, /\d/, /\d/, /\d/]}
              disabled={this.state.pagamento_app ? false : true}
            />

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>
            <MaskedInput
              className="form-control"
              name="conta"
              value={this.state.conta}
              onChange={this.changeInput}
              placeholder="Conta"
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
              disabled={this.state.pagamento_app ? false : true}
            />
            <Label> - </Label>
            <MaskedInput
              className="form-control"
              name="digito"
              value={this.state.digito}
              onChange={this.changeInput}
              placeholder="Dígito"
              mask={[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/]}
              guide={false}
              disabled={this.state.pagamento_app ? false : true}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup check inline>
          <Input
            className="form-check-input"
            type="radio"
            id="cpf-radio"
            name="id_tipo_cadastro_conta"
            value="1"
            checked={this.state.id_tipo_cadastro_conta === "1" ? true : false}
            onChange={this.changeInput}
            onBlur={this.validarCPF}
            disabled={this.state.pagamento_app ? false : true}
            guide={true}
            invalid={!this.state.validacao.cpf_administrador.valid}
            required
          />
          <FormFeedback invalid>{this.state.validacao.cpf_administrador.msg}</FormFeedback>
          <Label className="form-check-label" check htmlFor="cpf-radio">CPF</Label>
        </FormGroup>

        <FormGroup check inline>
          <Input
            className="form-check-input"
            type="radio"
            id="cnpj-radio"
            name="id_tipo_cadastro_conta"
            value="2"
            checked={this.state.id_tipo_cadastro_conta === "2" ? true : false}
            onChange={this.changeInput}
            onBlur={this.validarCNPJ}
            disabled={this.state.pagamento_app ? false : true}
            guide={true}
            invalid={!this.state.validacao.cnpj.valid}
            required
          />
          <FormFeedback invalid>{this.state.validacao.cnpj.msg}</FormFeedback>
          <Label className="form-check-label" check htmlFor="cnpj-radio">CNPJ</Label>
        </FormGroup>

        {this.state.id_tipo_cadastro_conta === "1" &&
          <FormGroup>

            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
              </InputGroupAddon>
              <MaskedInput
                className="form-control"
                name="cpfcnpj_conta"
                value={this.state.cpfcnpj_conta}
                onChange={this.changeInput}
                placeholder='000.000.000-00'
                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
                guide={true}
                disabled={this.state.pagamento_app ? false : true}
              />
            </InputGroup>
          </FormGroup>}

        {this.state.id_tipo_cadastro_conta === "2" &&
          <FormGroup>

            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
              </InputGroupAddon>
              <MaskedInput
                name="cpfcnpj_conta"
                className="form-control"
                value={this.state.cpfcnpj_conta}
                onChange={this.changeInput}
                placeholder='00.000.000/0000-00'
                mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
                guide={true}
                disabled={this.state.pagamento_app ? false : true}
              />
            </InputGroup>
          </FormGroup>}

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step3;