import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button, FormFeedback } from 'reactstrap';
import MaskedInput from '../../components/MaskedInput';
import SelectUF from '../../components/SelectUf';
import SelectEspecialidade from '../../components/SelectEspecialidade';
import SelectTipoAtendimento from '../../components/SelectTipoAtendimento';
import SuggestMunicipio from '../../components/SuggestMunicipio';
import serverRequest from '../../utils/serverRequest';
import { UncontrolledTooltip } from 'reactstrap';
import UploadFotoRestaurante from '../../components/UploadFotoRestaurante';


const stateName = "Step2";

class Step2 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      estados: [],
      municipios: [],
      suggestions: [],
      cnpj: '',
      razao_social: '',
      nome_restaurante: '',
      id_especialidade: '',
      id_tipo_atendimento: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      municipio: '',
      uf: 0,
      complemento: '',
      enderecoDisabled: false,
      imagem: "",

      validacao: {
        cnpj: { valid: false, invalid: false, msg: '' },
        razao_social: { valid: false, invalid: false, msg: '' },
        nome_restaurante: { valid: false, invalid: false, msg: '' },
        id_especialidade: { valid: false, invalid: false, msg: '' },
        id_tipo_atendimento: { valid: false, invalid: false, msg: '' },
        cep: { valid: false, invalid: false, msg: '' },
        logradouro: { valid: false, invalid: false, msg: '' },
        numero: { valid: false, invalid: false, msg: '' },
        bairro: { valid: false, invalid: false, msg: '' },
        municipio: { valid: false, invalid: false, msg: '' },
        uf: { valid: false, invalid: false, msg: '' },

      },
    };
  }

  validarCNPJ = async (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value.replace(/\D/g, '');

    if (val.length < 14) {
      msg = 'Formato inválido';
    }

    else if (!this.testarCNPJ(val)) {
      msg = 'CNPJ incorreto';
    }

    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cnpj.valid = valid;
    newState.cnpj.invalid = invalid;
    newState.cnpj.msg = msg;
    this.setState({ validacao: newState });

    if (val.length === 14) {
      let dados = await serverRequest.request('/restaurante/checarSeCNPJExiste', { cnpj: val });
      if (dados.exists) {
        let newState = Object.assign({}, this.state.validacao);
        newState.cnpj.valid = false;
        newState.cnpj.invalid = true;
        newState.cnpj.msg = 'Este CNPJ já está cadastrado';
        this.setState({ validacao: newState });
      }
    }

  }

  validarCEP = async (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (val.length < 8) {
      msg = 'Formato inválido';
    }

    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cep.valid = valid;
    newState.cep.invalid = invalid;
    newState.cep.msg = msg;
    this.setState({ validacao: newState });

    if (val.length === 8) {
      let res = await fetch('http://viacep.com.br/ws/' + val + '/json/');
      let dados = await res.json();
      if (!dados['erro']) {
        let formNewState = Object.assign({}, this.state);
        formNewState['logradouro'] = dados.logradouro;
        formNewState['bairro'] = dados.bairro;
        formNewState['municipio'] = dados.localidade;
        formNewState['uf'] = dados.uf;
        formNewState['enderecoDisabled'] = true;

        let valid = { valid: true, invalid: false, msg: '' }
        formNewState.validacao.logradouro = valid;
        formNewState.validacao.bairro = valid;
        formNewState.validacao.municipio = valid;
        formNewState.validacao.uf = valid;

        this.setState(formNewState);
      }
      else {
        let formNewState = Object.assign({}, this.state);
        formNewState['logradouro'] = '';
        formNewState['bairro'] = '';
        formNewState['municipio'] = '';
        formNewState['uf'] = '';
        formNewState['enderecoDisabled'] = false;

        let valid = { valid: false, invalid: true, msg: 'Campo obrigatório' }
        formNewState.validacao.logradouro = valid;
        formNewState.validacao.bairro = valid;
        formNewState.validacao.municipio = valid;
        formNewState.validacao.uf = valid;

        this.setState(formNewState);
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

  validarRazaoSocial = (event) => {
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
    newState.razao_social.valid = valid;
    newState.razao_social.invalid = invalid;
    newState.razao_social.msg = msg;
    this.setState({ validacao: newState });
  }

  validarNomedoRestaurante = (event) => {
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
    newState.nome_restaurante.valid = valid;
    newState.nome_restaurante.invalid = invalid;
    newState.nome_restaurante.msg = msg;
    this.setState({ validacao: newState });
  }

  validarIdEspecialidade = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }

    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.id_especialidade.valid = valid;
    newState.id_especialidade.invalid = invalid;
    newState.id_especialidade.msg = msg;
    this.setState({ validacao: newState });
  }

  validarTipoAtendimento = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }

    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.id_tipo_atendimento.valid = valid;
    newState.id_tipo_atendimento.invalid = invalid;
    newState.id_tipo_atendimento.msg = msg;
    this.setState({ validacao: newState });
  }

  validarLogradouro = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Este campo deve conter 3 caracteres ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.logradouro.valid = valid;
    newState.logradouro.invalid = invalid;
    newState.logradouro.msg = msg;
    this.setState({ validacao: newState });
  }

  validarNumero = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 1) {
      msg = 'Este campo deve conter 1 caracter ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.numero.valid = valid;
    newState.numero.invalid = invalid;
    newState.numero.msg = msg;
    this.setState({ validacao: newState });
  }

  validarBairro = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Este campo deve conter 4 caracter ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.bairro.valid = valid;
    newState.bairro.invalid = invalid;
    newState.bairro.msg = msg;
    this.setState({ validacao: newState });
  }

  validarMunicipio = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Este campo deve conter 4 caracter ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.municipio.valid = valid;
    newState.municipio.invalid = invalid;
    newState.municipio.msg = msg;
    this.setState({ validacao: newState });
  }

  validarEstado = (event) => {
    let valid = false, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else {
      valid = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.uf.valid = valid;
    newState.uf.msg = msg;
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
      alert('Preencha todos os campos corretamente');
  }

  retornar = () => {
    this.props.saveValues(stateName, this.state);
    this.props.previousStep();
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>

        <h4 className="text-center">Dados do Restaurante</h4>
        <FormGroup>
          <Label>Logo do restaurante:</Label>
          <UploadFotoRestaurante name="imagem" onChange={this.changeInput} path={this.state.imagem}  ></UploadFotoRestaurante>
        </FormGroup>

        <FormGroup>
          <Label>CNPJ:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cup"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput
              maxLength="18"
              name="cnpj"
              className="form-control"
              value={this.state.cnpj}
              onChange={this.changeInput}
              onBlur={this.validarCNPJ}
              placeholder='00.000.000/0000-00'
              mascara="99.999.999/9999-99"
              invalid={this.state.validacao.cnpj.invalid}
              valid={this.state.validacao.cnpj.valid}
              required
            />
            <FormFeedback>{this.state.validacao.cnpj.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Razão social:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cup"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="razao_social"
              value={this.state.razao_social}
              onChange={this.changeInput}
              onBlur={this.validarRazaoSocial}
              type='text'
              placeholder='Razão social da empresa'
              invalid={this.state.validacao.razao_social.invalid}
              valid={this.state.validacao.razao_social.valid}
              required
            />
            <FormFeedback>{this.state.validacao.razao_social.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Nome do restaurante:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cup"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="nome_restaurante"
              value={this.state.nome_restaurante}
              onChange={this.changeInput}
              onBlur={this.validarNomedoRestaurante}
              placeholder="Nome do restaurante"
              id="informativoCodigo"
              invalid={this.state.validacao.nome_restaurante.invalid}
              valid={this.state.validacao.nome_restaurante.valid}
              required
            />
            <UncontrolledTooltip placement="top" target="informativoCodigo">
              Este será o nome que irá aparecer no aplicativo
           </UncontrolledTooltip>

            <FormFeedback>{this.state.validacao.nome_restaurante.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Especialidade: </Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cup"></i></InputGroupText>
            </InputGroupAddon>
            <SelectEspecialidade
              required
              onBlur={this.validarIdEspecialidade}
              name="id_especialidade"
              value={this.state.id_especialidade}
              onChange={this.changeInput}
              placeholder="Escreva aqui"
              valid={this.state.validacao.id_especialidade.valid}
              invalid={this.state.validacao.id_especialidade.invalid}
            >
            </SelectEspecialidade>
            <FormFeedback>{this.state.validacao.id_especialidade.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de atendimento: </Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cup"></i></InputGroupText>
            </InputGroupAddon>
            <SelectTipoAtendimento
              required
              onBlur={this.validarTipoAtendimento}
              name="id_tipo_atendimento"
              value={this.state.id_tipo_atendimento}
              onChange={this.changeInput}
              placeholder="Escreva aqui"
              valid={this.state.validacao.id_tipo_atendimento.valid}
              invalid={this.state.validacao.id_tipo_atendimento.invalid}
            >
            </SelectTipoAtendimento>
            <FormFeedback>{this.state.validacao.id_tipo_atendimento.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>

       

        <FormGroup>
          <Label>CEP:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-map"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput
              maxLength="9"
              name="cep"
              className="form-control"
              value={this.state.cep}
              onChange={this.changeInput}
              onBlur={this.validarCEP}
              placeholder='CEP do restaurante'
              mascara="99999-999"
              invalid={this.state.validacao.cep.invalid}
              valid={this.state.validacao.cep.valid}
              required
            />
            <FormFeedback>{this.state.validacao.cep.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Endereço:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-map"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="logradouro"
              value={this.state.logradouro}
              onChange={this.changeInput}
              onBlur={this.validarLogradouro}
              type='text'
              placeholder='Logradouro do restaurante'
              disabled={this.state.enderecoDisabled}
              invalid={this.state.validacao.logradouro.invalid}
              valid={this.state.validacao.logradouro.valid}
              required
            />
            <FormFeedback>{this.state.validacao.logradouro.msg}</FormFeedback>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Número: </Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-map"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              name="numero"
              value={this.state.numero}
              onChange={this.changeInput}
              onBlur={this.validarNumero}
              type='text'
              placeholder='Número do restaurante'
              invalid={this.state.validacao.numero.invalid}
              valid={this.state.validacao.numero.valid}
              required
            />
            <FormFeedback>{this.state.validacao.numero.msg}</FormFeedback>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Complemento (opcional):</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-map"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              placeholder='Complemento do restaurante'
              name="complemento"
              value={this.state.complemento}
              onChange={this.changeInput}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Bairro:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-map"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              name="bairro"
              value={this.state.bairro}
              onChange={this.changeInput}
              disabled={this.state.enderecoDisabled}
              onBlur={this.validarBairro}
              type='text'
              placeholder='Bairro do restaurante'
              invalid={this.state.validacao.bairro.invalid}
              valid={this.state.validacao.bairro.valid}
              required
            />
            <FormFeedback>{this.state.validacao.bairro.msg}</FormFeedback>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Estado:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-map"></i></InputGroupText>
            </InputGroupAddon>
            <SelectUF
              name="uf"
              value={this.state.uf}
              onChange={this.changeInput}
              onBlur={this.validarEstado}
              valid={this.state.validacao.uf.valid}
              invalid={this.state.validacao.uf.invalid}
              disabled={this.state.enderecoDisabled}
              required>
            </SelectUF>
            <FormFeedback>{this.state.validacao.uf.msg}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Município:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-map"></i></InputGroupText>
            </InputGroupAddon>
            <SuggestMunicipio
              name="municipio"
              value={this.state.municipio}
              onChange={this.changeInput}
              onBlur={this.validarMunicipio}
              disabled={this.state.enderecoDisabled}
              type='text'
              placeholder='Município do restaurante'
              invalid={this.state.validacao.municipio.invalid}
              valid={this.state.validacao.municipio.valid}
              required
            >
              <FormFeedback>{this.state.validacao.municipio.msg}</FormFeedback>
            </SuggestMunicipio>
          </InputGroup>
        </FormGroup>

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }

}

export default Step2;