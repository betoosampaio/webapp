import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import styles from './styles.css'
import MaskedInput from 'react-text-mask';
export class FormUserDetails extends Component {

  validarCampos = e=>{
    e.preventDefault();
    this.props.validarCampos();
  }

  continue = e => {

    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Dados do Usuário" />

          <form className='cadastrar'>

            <p></p>

            <input
              type='text'
              placeholder='Nome Administrador'
              name='nome_administrador'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("nome_administrador")}
              defaultValue={values.nome_administrador}
            />

            <p></p>

            <MaskedInput

              onBlur={this.validarCPF}
              onChange={handleChange("cpf")}
              defaultValue={values.cpf}
              placeholder='CPF Administrador'
              name='cpf_administrador'
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
              guide={true}
            />

            <p></p>

            <input
              type='text'
              placeholder='E-mail'
              name='email'
              onChange={handleChange("email")}
              defaultValue={values.email}
              onBlur={this.validarEmail}
            />

            <p></p>

            <MaskedInput placeholder='Celular'
              name='celular'
              onChange={handleChange("celular")}
              defaultValue={values.celular}
              onBlur={this.validarCelular}
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
              guide={true}
            />


            <p></p>

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
