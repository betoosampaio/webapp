import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import styles from './styles.css'
export class FormUserDetails extends Component {
  continue = e => {

    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  show = e => {
    e.preventDefault();
    this.props.show();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Dados Login" />

          <form className='cadastrar'>
            <input
              type='text'
              placeholder='Código Restaurante'
              name='codigo_restaurante'
              onChange={handleChange("Codigo_restaurante")}
              defaultValue={values.Codigo_restaurante}
              onBlur={this.validarCodigoRestaurante}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.cnpj.msg}</span>


           <p></p>

            <input
              type='text'
              placeholder='Nome do restaurante'
              name='nome_restaurante'
              onChange={handleChange("nome_restaurante")}
              defaultValue={values.nome_restaurante}
              onBlur={this.validarCampoVazio}
            />

<p></p>
            <input
              type='text'
              placeholder='Login'
              name='login'
              onChange={handleChange("LoginRestaurante")}
              defaultValue={values.LoginRestaurante}
              onBlur={this.validarLogin}

            />

<p></p>
            <input
              type='password'
              placeholder='Senha'
              name='senha'
              onChange={handleChange("SenhaRestaurante")}
              defaultValue={values.SenhaRestaurante}
              onBlur={this.validarSenha}
            />
          
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

export default FormUserDetails;
