import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import MaskedInput from 'react-text-mask';
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
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Dados Bancários" />

          <form className='cadastrar'>


            <input
              placeholder='tipo de conta'
              name="id_tipo_cadastro_conta"
              onChange={handleChange("id_tipo_conta")}
              defaultValue={values.id_tipo_conta}
            />

            <p></p>
            <input
              name="codigo_banco"
            placeholder='codigo_banco'
              onChange={handleChange("codigo_banco")}
              defaultValue={values.codigo_banco}
            />
            <p></p>

            <MaskedInput
              placeholder='Agência'
              name='agencia'
              onChange={handleChange("agencia")}
              defaultValue={values.agencia}
              onBlur={this.validarCampoVazio}
              mask={[/\d/, /\d/, /\d/, /\d/]}
            />

            <p></p>

            <MaskedInput
              placeholder='Conta'
              name='conta'
              onChange={handleChange("conta")}
              defaultValue={values.conta}
              onBlur={this.validarCampoVazio}
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
            />

            <p></p>

            <MaskedInput
              name='digito'
              placeholder='Dígito'
              onChange={handleChange("digito")}
              defaultValue={values.digito}
              onBlur={this.validarCampoVazio}
              mask={[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/]}
              guide={false}
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
