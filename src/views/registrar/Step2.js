import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import SelectUF from '../../components/selectUF/SelectUf';
import SelectEspecialidade from '../../components/selectEspecialidade/SelectEspecialidade';
import SuggestMunicipio from '../../components/suggestMunicipio/SuggestMunicipio';
import serverRequest from '../../utils/serverRequest';

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
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      municipio: '',
      uf: 0,
      complemento: '',
      enderecoDisabled: false,
      validacao: {
        cnpj: { ok: true, msg: '' },
        razao_social: { ok: true, msg: '' },
        nome_restaurante: { ok: true, msg: '' },
        id_especialidade: { ok: true, msg: '' },
        cep: { ok: true, msg: '' },
        logradouro: { ok: true, msg: '' },
        numero: { ok: true, msg: '' },
        bairro: { ok: true, msg: '' },
        municipio: { ok: true, msg: '' },
        uf: { ok: true, msg: '' },
        complemento: { ok: true },
      },
    };
  }

  validarCNPJ = async (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');

    if (val.length < 14) {
      msg = 'Formato inválido';
    }

    else if (!this.testarCNPJ(val)) {
      msg = 'CNPJ incorreto';
    }

    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cnpj.ok = ok;
    newState.cnpj.msg = msg;
    this.setState({ validacao: newState });

    if (val.length === 14) {
      let dados = await serverRequest.request('/restaurante/checarSeCNPJExiste', { cnpj: val });
      if (dados.exists) {
        let newState = Object.assign({}, this.state.validacao);
        newState.cnpj.ok = false;
        newState.cnpj.msg = 'Este CNPJ já está cadastrado';
        this.setState({ validacao: newState });
      }
    }

  }

  validarCEP = async (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (val.length < 8) {
      msg = 'Formato inválido';
    }
    
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cep.ok = ok;
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
        this.setState(formNewState);
      }
      else {
        let formNewState = Object.assign({}, this.state);
        formNewState['logradouro'] = '';
        formNewState['bairro'] = '';
        formNewState['municipio'] = '';
        formNewState['uf'] = '';
        formNewState['enderecoDisabled'] = false;
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

  prosseguir = (event) => {
    event.preventDefault();

    let ok = true;

    Object.keys(this.state.validacao).forEach(p => {
      if (!this.state.validacao[p].ok) {
        ok = false;
      }
    });

    if (ok) {
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
          <Label>CNPJ:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cup"></i></InputGroupText>
            </InputGroupAddon>
            <MaskedInput
              name="cnpj"
              className="form-control"
              value={this.state.cnpj}
              onChange={this.changeInput}
              onBlur={this.validarCNPJ}
              placeholder='00.000.000/0000-00'
              mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
              guide={true}
              required
            />
            <span style={{ color: 'red' }}>{this.state.validacao.cnpj.msg}</span>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Razão Social:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cup"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              name="razao_social"
              value={this.state.razao_social}
              onChange={this.changeInput}
              type='text'
              placeholder='Razão social da empresa'
              required
              minLength="4"
              maxLength="255"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Nome Restaurante:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cup"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="nome_restaurante" value={this.state.nome_restaurante} onChange={this.changeInput} placeholder="Nome do Restaurante" required />
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
              name="id_especialidade"
              value={this.state.id_especialidade}
              onChange={this.changeInput}>
            </SelectEspecialidade>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Cep:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput
              name="cep"
              className="form-control"
              value={this.state.cep}
              onChange={this.changeInput}
              onBlur={this.validarCEP}
              placeholder='00000-000'
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
              guide={true}
              required
            />
            <span style={{ color: 'red' }}>{this.state.validacao.cep.msg}</span>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Endereço:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              name="logradouro"
              value={this.state.logradouro}
              onChange={this.changeInput}
              type='text'
              placeholder='Avenida Paulista'
              disabled={this.state.enderecoDisabled}
              required
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Número:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              name="numero"
              value={this.state.numero}
              onChange={this.changeInput}
              type='text'
              placeholder='1234'
              required
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Complemento:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              placeholder='Bloco C'
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
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              name="bairro"
              value={this.state.bairro}
              onChange={this.changeInput}
              disabled={this.state.enderecoDisabled}
              type='text'
              placeholder='Bela Vista'
              required
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Estado:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <SelectUF
              name="uf"
              value={this.state.uf}
              onChange={this.changeInput}
              disabled={this.state.enderecoDisabled}
              required>
            </SelectUF>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Município:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <SuggestMunicipio
              name="municipio"
              value={this.state.municipio}
              onChange={this.changeInput}
              disabled={this.state.enderecoDisabled}
              type='text'
              placeholder='São Paulo'
              required
            ></SuggestMunicipio>
          </InputGroup>
        </FormGroup>

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }

}

export default Step2;
