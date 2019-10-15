import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import MaskedInput from 'react-text-mask';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';
import RaisedButton from "material-ui/RaisedButton";
const path = process.env.REACT_APP_SRV_PATH;
export class FormPersonalDetails extends Component {
  state = {
    estados: [],
    municipios: [],
    suggestions: [],
    formulario: {
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
    },
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


  componentDidMount() {
    this.obterVariaveisCadastro();
}

obterVariaveisCadastro = async function () {
  let res = await fetch(path + '/restaurante/obterVariaveisCadastro', {
      method: 'POST',
  });
  let dados = await res.json();
  this.setState({
      
      municipios: dados[1],
      estados: dados[2],
   
  });
}
 
  formChangeSelect = name => value => {
    let formNewState = Object.assign({}, this.state);
    formNewState[name] = value;
    this.setState({ formulario: formNewState });

    let ValidnewState = Object.assign({}, this.state.validacao);
    ValidnewState[name].ok = true;
    ValidnewState[name].msg = '';
    this.setState({ validacao: ValidnewState });
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
        formNewState['uf'] = this.state.estados.find(e => e.uf == dados.uf);
        formNewState['enderecoDisabled'] = true;
        this.setState({ formulario: formNewState });

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
        let formNewState = Object.assign({}, this.state);
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


  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.municipios.filter(lang =>
      lang.municipio.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  getSuggestionValue = suggestion => {
    let formNewState = Object.assign({}, this.state);
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

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (

      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Dados do Restaurante" />

          <form className='cadastrar'>

            <label>Cnpj</label>
            <p></p>

            <MaskedInput
              onChange={handleChange("cnpj")}
              defaultValue={values.cnpj}
              onBlur={this.validarCNPJ}
              name='cnpj'
              placeholder='Qual o cnpj do restaurante ?'
              mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]} guide={true}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.cnpj.msg}</span>

            <p></p>

            <label>Razão Social</label>
            <p></p>
            <input
              type='text'
              placeholder='E qual seria a sua Razão Social ?'
              name='razao_social'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("razao_social")}
              defaultValue={values.razao_social}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.razao_social.msg}</span>

            <p></p>

            <label>Cep</label>

            <p></p>
            <MaskedInput
              defaultValue={values.cep}
              onChange={handleChange("cep")}
              onBlur={this.validarCEP}
              name='cep'
              placeholder='Aqui seria o cep do restaurante !'
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
              guide={true}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.cep.msg}</span>
            <p></p>

            <label>Endereço</label>
            <p></p>
            <input
              type='text'
              placeholder='Qual seria o Endereço ? '
              name='logradouro'
              onBlur={this.validarCampoVazio}
              defaultValue={values.logradouro}
              onChange={handleChange("logradouro")}
              disabled={this.state.formulario.enderecoDisabled}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.logradouro.msg}</span>
            <p></p>

            <label>Número</label>
            <p></p>
            <input
              type='text'
              placeholder='Número'
              name='numero'
              onChange={handleChange("numero")}
              defaultValue={values.numero}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.numero.msg}</span>
            <p></p>

            <label>Complemento</label>
            <p></p>
            <input
              type='text'
              placeholder='Complemento'
              name='complemento'
              defaultValue={values.complemento}
              onChange={handleChange("complemento")}
            />
            <p></p>

            <label>Bairro</label>
            <p></p>
            <input
              type='text'
              placeholder='Bairro'
              name='bairro'
              defaultValue={values.bairro}
              onChange={handleChange("bairro")}
              onBlur={this.validarCampoVazio}
              disabled={this.state.formulario.enderecoDisabled}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.bairro.msg}</span>
            <p></p>

            <label>Estado</label>
            <p></p>
            <Select
              name="uf"
              options={this.state.estados}
              getOptionLabel={option => option.uf}
              getOptionValue={option => option.uf}
              defaultValue={values.uf}
              onChange={handleChange("uf")}
              isDisabled={this.state.formulario.enderecoDisabled}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.uf.msg}</span>
            <p></p>

            <label>Município</label>
            <p></p>
            <Autosuggest
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={{
                type: 'text',
                placeholder: 'Município',
                name: 'municipio',
                value: this.state.formulario.municipio,
                onChange: this.formChange,
                onBlur: this.validarCampoVazio,
                disabled: this.state.formulario.enderecoDisabled
              }}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.municipio.msg}</span>
            <p></p>


            <RaisedButton
              label="Back"
              primary={false}
              style={styles.button}
              onClick={this.back}
            />

            <RaisedButton
              label="Continue"
              primary={true}
              style={styles.button}
              onClick={this.continue}
            />


          </form>

        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
const styles = {
  button: {
    margin: 15
  }
};
export default FormPersonalDetails;
