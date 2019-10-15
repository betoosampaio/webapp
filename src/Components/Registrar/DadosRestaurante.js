import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import MaskedInput from 'react-text-mask';
import RaisedButton from "material-ui/RaisedButton";

export class FormPersonalDetails extends Component {
  state = {
    validacao: {

      cnpj: { ok: false, msg: '*' },
      razao_social: { ok: false, msg: '*' },
      especialidade: { ok: false, msg: '*' },
      cep: { ok: false, msg: '*' },
      logradouro: { ok: false, msg: '*' },
      numero: { ok: false, msg: '*' },
      complemento: { ok: false, msg: '*' },
      bairro: { ok: false, msg: '*' },
      uf: { ok: false, msg: '*' },
      municipio: { ok: false, msg: '*' },

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

            <span style={{ color: 'red' }}>{this.state.validacao.cnpj.msg}</span>

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

            <input
              type='text'
              placeholder='Qual seria a Especialidade ?'
              name='razao_social'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("especialidade")}
              defaultValue={values.especialidade}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.especialidade.msg}</span>

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

            <span style={{ color: 'red' }}>{this.state.validacao.cep.msg}</span>

            <p></p>

            <input
              type='text'
              placeholder='Qual seria o Endereço ? '
              name='logradouro'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("logradouro")}
              defaultValue={values.logradouro}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.logradouro.msg}</span>

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

            <span style={{ color: 'red' }}>{this.state.validacao.numero.msg}</span>

            <p></p>

            <input
              type='text'
              placeholder='Complemento'
              name='complemento'
              onChange={handleChange("complemento")}
              defaultValue={values.complemento}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.complemento.msg}</span>

            <p></p>

            <input
              type='text'
              placeholder='Bairro'
              name='bairro'
              onChange={handleChange("bairro")}
              defaultValue={values.bairro}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.bairro.msg}</span>

            <p></p>

            <input
              type='text'
              placeholder='Estado'
              name='uf'
              onChange={handleChange("uf")}
              defaultValue={values.uf}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.uf.msg}</span>

            <p></p>

            <input
              type='text'
              placeholder='municipio'
              name='municipio'
              onChange={handleChange("municipio")}
              defaultValue={values.municipio}
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
