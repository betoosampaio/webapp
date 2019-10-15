import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import MaskedInput from 'react-text-mask';
import RaisedButton from "material-ui/RaisedButton";
const path = process.env.REACT_APP_SRV_PATH;
export class DadosLogin extends Component {
  state = {

    formulario: {
      codigo_restaurante: '',
      nome_restaurante: '',
      login: '',
      senha: '',
      enderecoDisabled: false,
    },
    validacao: {
      codigo_restaurante: { ok: false, msg: '*' },
      nome_restaurante: { ok: false, msg: '*' },
      login: { ok: false, msg: '*' },
      senha: { ok: false, msg: '*' }
    },
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
  validarCodigoRestaurante = async (event) => {
    let ok = false, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 6) {
      msg = 'Código do restaurante precisar ter 6 ou mais caracteres';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.codigo_restaurante.ok = ok;
    newState.codigo_restaurante.msg = msg;
    this.setState({ validacao: newState });

    if (val.length >= 6) {
      let res = await fetch(path + '/restaurante/checarSeCodigoExiste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo_restaurante: val })
      });
      let json = await res.json();
      if (json.exists) {
        let newState = Object.assign({}, this.state.validacao);
        newState.codigo_restaurante.ok = false;
        newState.codigo_restaurante.msg = 'Este código já existe';
        this.setState({ validacao: newState });
      }
    }
  }
  validarLogin = async (event) => {
    let ok = false, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Login precisar ter 4 ou mais caracteres';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.login.ok = ok;
    newState.login.msg = msg;
    this.setState({ validacao: newState });
  }

  
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  cadastrar = e => {
    e.preventDefault();
    this.props.cadastrar();
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
          <AppBar title="Dados do Login" />

          <form className='cadastrar'>
            <p></p>
            <label>Código do restaurante</label>
            <p></p>
            <input
              type='text'
              placeholder='Código Restaurante ?'
              name='codigo_restaurante'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("codigo_restaurante")}
              defaultValue={values.codigo_restaurante}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.codigo_restaurante.msg}</span>


            <p></p>
            <label>Nome do restaurante</label>
            <p></p>
            <input
              type='text'
              placeholder='Qual seria o  nome do restaurante?'
              name='nome_restaurante'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("nome_restaurante")}
              defaultValue={values.nome_restaurante}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.nome_restaurante.msg}</span>

            <p></p>
            <label>Login do restaurante</label>
            <p></p>
            <input
              type='text'
              placeholder='Qual seria o Login?'
              name='login'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("login")}
              defaultValue={values.login}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.login.msg}</span>

            <p></p>
            <label>Senha do restaurante</label>
            <p></p>
            <input
              type='text'
              placeholder='Qual seria a senha ? '
              name='senha'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("senha")}
              defaultValue={values.senha}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.senha.msg}</span>

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
            <RaisedButton
              label="cadastrar"
              primary={true}
              style={styles.button}
              onClick={this.cadastrar}
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
export default DadosLogin;
