import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import styles from './Styles.css'
import MaskedInput from 'react-text-mask';

const path = process.env.REACT_APP_SRV_PATH;
export class FormUserDetails extends Component {
  state = {

    formulario: {
      celular: '',
      email: '',
      cpf_administrador: '',
      nome_administrador: '',

    },
    validacao: {
      celular: { ok: false, msg: '*' },
      email: { ok: false, msg: '*' },
      cpf_administrador: { ok: false, msg: '*' },
      nome_administrador: { ok: false, msg: '*' }
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
  validarCelular = (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 11) {
      msg = 'Celular incompleto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.celular.ok = ok;
    newState.celular.msg = msg;
    this.setState({ validacao: newState });
  }
  validarEmail = (event) => {
    let ok = false, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (!/.+@.+\..+/.test(val)) {
      msg = 'Email incorreto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.email.ok = ok;
    newState.email.msg = msg;
    this.setState({ validacao: newState });
  }
  validarCPF = (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (!this.testarCPF(val)) {
      msg = 'CPF incorreto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cpf_administrador.ok = ok;
    newState.cpf_administrador.msg = msg;
    this.setState({ validacao: newState });
  }
  testarCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
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

<<<<<<< HEAD
            <label>Nome do Administrador</label>

            <p></p>
                    
            <input
              type='text'
              placeholder='Nome Administrador'
              name='nome_administrador'
              onBlur={this.validarCampoVazio}
              onChange={handleChange("nome_administrador")}
              defaultValue={values.nome_administrador}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.nome_administrador.msg}</span>

            <p></p>

            <label>CPF</label>

            <p></p>

=======
            <label>Cpf</label>
            <p></p>
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89
            <MaskedInput
              onChange={this.formChange}
              onBlur={this.validarCPF}
              value={this.state.formulario.cpf_administrador}
              placeholder='CPF Administrador'
              name='cpf_administrador'
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
              guide={true}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.cpf_administrador.msg}</span>
            <p></p>

<<<<<<< HEAD
            <label>E-mail do Administrador</label>

            <p></p>

=======
            <label>Nome do Administrador</label>
            <p></p>
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89
            <input
              type='text'
              placeholder='Nome Administrador'
              name='nome_administrador'
              onChange={this.formChange}
              onBlur={this.validarCampoVazio}
              value={this.state.formulario.nome_administrador}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.nome_administrador.msg}</span>
            <p></p>

<<<<<<< HEAD
            <label>E-mail do Administrador</label>

            <p></p>

=======

            <label>Celular</label>
            <p></p>
>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89
            <MaskedInput placeholder='Celular'
              name='celular'
              value={this.state.formulario.celular}
              onChange={this.formChange}
              onBlur={this.validarCelular}
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
              guide={true}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.celular.msg}</span>
            <p></p>

            <label>E-mail</label>
            <p></p>
<<<<<<< HEAD
            
=======
            <input
              type='text'
              placeholder='E-mail'
              name='email'
              value={this.state.formulario.email}
              onChange={this.formChange}
              onBlur={this.validarEmail}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.email.msg}</span>
            <p></p>


>>>>>>> 245408ff3855a061f5f4791bb343b749b3ac5e89
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
