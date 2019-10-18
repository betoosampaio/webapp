import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';
import SelectUF from '../../components/selectUF/SelectUf'

const stateName = "Step2";
const path = process.env.REACT_APP_SRV_PATH;

class Step2 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      estados: [],
      municipios: [],
      suggestions: [],
      cnpj: '',
      razao_social: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      municipio: '',
      uf: 0,
      complemento: '',
      enderecoDisabled: false,
      validacao: {
        cnpj: { ok: false, msg: '*' },
        razao_social: { ok: false, msg: '*' },
        cep: { ok: false, msg: '*' },
        logradouro: { ok: false, msg: '*' },
        numero: { ok: false, msg: '*' },
        bairro: { ok: false, msg: '*' },
        municipio: { ok: false, msg: '*' },
        uf: { ok: false, msg: '*' },
        complemento: { ok: true },

      },
    };
  }



  componentDidMount() {
    this.obterVariaveisCadastro();
  }
  obterVariaveisCadastro = async function () {
    let res = await fetch('http://localhost:3001/restaurante/obterVariaveisCadastro', {
      method: 'POST',
    });
    let dados = await res.json();
    this.setState({
      bancos: dados[0],
      municipios: dados[1],
      estados: dados[2],
      tipoConta: dados[3],
      tipoCadastroConta: dados[4]
    });
  }
  formChange = (event) => {
    if (event.target.name) {
      let formNewState = Object.assign({}, this.state);
      formNewState[event.target.name] = event.target.value;
      this.setState(formNewState);
    }
  }
  formChangeSelect = name => value => {
    let formNewState = Object.assign({}, this.state);
    formNewState[name] = value;
    this.setState(formNewState);

    let ValidnewState = Object.assign({}, this.state.validacao);
    ValidnewState[name].ok = true;
    ValidnewState[name].msg = '';
    this.setState({ validacao: ValidnewState });
  }

  validarCNPJ = async (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (!val) {
      msg = 'Campo obrigatório';
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

    if (val.length == 14) {
      let res = await fetch(path + '/restaurante/checarSeCNPJExiste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cnpj: val })
      });
      let json = await res.json();
      if (json.exists) {
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
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 8) {
      msg = 'CEP Incompleto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cep.ok = ok;
    newState.cep.msg = msg;
    this.setState({ validacao: newState });

    if (val.length == 8) {
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

        let ValidnewState = Object.assign({}, this.state.validacao);
        ValidnewState.logradouro.ok = true;
        ValidnewState.logradouro.msg = '';
        ValidnewState.bairro.ok = true;
        ValidnewState.bairro.msg = '';
        ValidnewState.municipio.ok = true;
        ValidnewState.municipio.msg = '';
        ValidnewState.uf.ok = true;
        ValidnewState.uf.msg = '';
        this.setState({ validacao: ValidnewState });
      }
      else {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState['logradouro'] = '';
        formNewState['bairro'] = '';
        formNewState['municipio'] = '';
        formNewState['uf'] = '';
        formNewState['enderecoDisabled'] = false;
        this.setState({ formulario: formNewState });

        let ValidnewState = Object.assign({}, this.state.validacao);
        ValidnewState.logradouro.ok = false;
        ValidnewState.logradouro.msg = 'Campo obrigatório';
        ValidnewState.bairro.ok = false;
        ValidnewState.bairro.msg = 'Campo obrigatório';
        ValidnewState.municipio.ok = false;
        ValidnewState.municipio.msg = 'Campo obrigatório';
        ValidnewState.uf.ok = false;
        ValidnewState.uf.msg = 'Campo obrigatório';
        this.setState({ validacao: ValidnewState });
      }
    }
  }

  testarCNPJ = (cnpj) => {
    if (cnpj == '') return false;

    if (cnpj.length != 14)
      return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
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
    if (resultado != digitos.charAt(0))
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
    if (resultado != digitos.charAt(1))
      return false;

    return true;
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

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.municipios.filter(lang =>
      lang.municipio.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  getSuggestionValue = suggestion => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState['municipio'] = suggestion.municipio;
    this.setState({ formulario: formNewState });
  };
  renderSuggestion = suggestion => (
    <div>
      {suggestion.municipio}
    </div>
  );
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


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



  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>

        <h4 className="text-center">Dados do restaurante</h4>


        <FormGroup>
          <Label>CNPJ:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>


            <MaskedInput
              name="cnpj"
              className="form-control"
              value={this.state.cnpj}
              onChange={this.changeInput}
              onBlur={this.validarCNPJ}
              placeholder='Qual o cnpj do restaurante ?'
              mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]} guide={true}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.cnpj.msg}</span>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Razão Social:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>


            <Input
              name="razao_social"
              value={this.state.razao_social}
              onChange={this.changeInput}
              type='text'
              placeholder='E qual seria a sua Razão Social ?'
              onBlur={this.validarCampoVazio}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.razao_social.msg}</span>

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
              placeholder='Aqui seria o cep do restaurante !'
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
              guide={true}
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
              placeholder='Qual seria o Endereço ? '
              onBlur={this.validarCampoVazio}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.logradouro.msg}</span>

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
              placeholder='Número'
            />
            <span style={{ color: 'red' }}>{this.state.validacao.numero.msg}</span>

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
              placeholder='Complemento'
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
              type='text'
              placeholder='Bairro'
              onBlur={this.validarCampoVazio}

            />
            <span style={{ color: 'red' }}>{this.state.validacao.bairro.msg}</span>

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
              onChange={this.changeInput}>
            </SelectUF>


            <span style={{ color: 'red' }}>{this.state.validacao.uf.msg}</span>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Cidade:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>


            <Autosuggest
              className="form-control"
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={{
                
                type: 'text',
                placeholder: 'Município',
                name: 'municipio',
                value: this.state.municipio,
                onChange: this.formChange,
                onBlur: this.validarCampoVazio,

              }}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.municipio.msg}</span>

          </InputGroup>
        </FormGroup>




        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step2;
