import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import MaskedInput from 'react-text-mask';
import RaisedButton from "material-ui/RaisedButton";
<<<<<<< HEAD
import styles from './Styles.css'
export class FormUserDetails extends Component {
  continue = e => {
=======
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89

export class DadosLogin extends Component {
  state = {
    validacao: {

      codigo_restaurante: { ok: false, msg: '*' },
      nome_restaurante: { ok: false, msg: '*' },
      login: { ok: false, msg: '*' },
      senha: { ok: false, msg: '*' },
  
   

    },
  }

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
          <AppBar title="Dados do Login" />

          <form className='cadastrar'>
            <p></p>
<<<<<<< HEAD

            <label>Código do restaurante</label>

            <p></p>

            <input
=======
            <label>Código do restaurante</label>
            <p></p>
          <input
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89
              type='text'
              placeholder='Código Restaurante ?'
              name='codigo_restaurante'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("codigo_restaurante")}
              defaultValue={values.codigo_restaurante}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.codigo_restaurante.msg}</span>

<<<<<<< HEAD
            <p></p>

            <label>Nome do restaurante</label>

            <p></p>
=======
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89

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

<<<<<<< HEAD
            <p></p>

            <label>Login</label>

            <p></p>

=======
            <span style={{ color: 'red' }}>{this.state.validacao.nome_restaurante.msg}</span>

            <p></p>
            <label>Login do restaurante</label>
            <p></p>
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89
            <input
              type='text'
              placeholder='Qual seria o Login?'
              name='login'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("login")}
              defaultValue={values.login}
            />

<<<<<<< HEAD
            <p></p>

            <label>Senha</label>

            <p></p>

            <input
              type='password'
              placeholder='Digite sua senha'
=======
            <span style={{ color: 'red' }}>{this.state.validacao.login.msg}</span>

            <p></p>
            <label>Senha do restaurante</label>
            <p></p>
            <input
              type='text'
              placeholder='Qual seria a senha ? '
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89
              name='senha'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("senha")}
              defaultValue={values.senha}
            />

<<<<<<< HEAD
            <p></p>
=======
            <span style={{ color: 'red' }}>{this.state.validacao.senha.msg}</span>

            <p></p>

         
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89

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
export default DadosLogin;
