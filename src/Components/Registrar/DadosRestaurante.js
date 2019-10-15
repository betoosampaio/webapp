import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import MaskedInput from 'react-text-mask';
import RaisedButton from "material-ui/RaisedButton";
export class FormPersonalDetails extends Component {
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

            <MaskedInput
              onChange={handleChange("cnpj")}
              defaultValue={values.cnpj}
              onBlur={this.validarCNPJ}
              name='cnpj'
              placeholder='Qual o cnpj do restaurante ?'
              mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]} guide={true}
            />


            <p></p>


            <input
              type='text'
              placeholder='E qual seria a sua Razão Social ?'
              name='razao_social'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("razao_social")}
              defaultValue={values.razao_social}
            />


            <p></p>

            <input
              type='text'
              placeholder='Qual seria a Especialidade ?'
              name='razao_social'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("especialidade")}
              defaultValue={values.especialidade}
            />


            <p></p>


            <MaskedInput
              onChange={handleChange("cep")}
              defaultValue={values.cep}
              onBlur={this.validarCEP}
              name='cep'
              placeholder='Aqui seria o cep do restaurante !'
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
              guide={true}
            />

            <p></p>

            <input
              type='text'
              placeholder='Qual seria o Endereço ? '
              name='logradouro'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("logradouro")}
              defaultValue={values.logradouro}

            />

            <p></p>

            <MaskedInput
              type='text'
              placeholder='Número do endereço'
              name='numero'
              onChange={handleChange("numero")}
              defaultValue={values.numero}
              onBlur={this.validarCampoVazio}
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
            />

            <p></p>

            <input
              type='text'
              placeholder='Complemento'
              name='complemento'
              onChange={handleChange("complemento")}
              defaultValue={values.complemento}
            />

            <p></p>

            <input
              type='text'
              placeholder='Bairro'
              name='bairro'
              onChange={handleChange("bairro")}
              defaultValue={values.bairro}
            />


            <p></p>

            <input
              type='text'
              placeholder='Estado'
              name='uf'
              onChange={handleChange("uf")}
              defaultValue={values.uf}


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
const styles = {
  button: {
    margin: 15
  }
};
export default FormPersonalDetails;
