import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import styles from './Styles.css'
import MaskedInput from 'react-text-mask';


export class FormUserDetails extends Component {
  state = {
    validacao: {


      celular: { ok: false, msg: '*' },
      email: { ok: false, msg: '*' },
      cpf_administrador: { ok: false, msg: '*' },
      nome_administrador: { ok: false, msg: '*' },

    },
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

            <MaskedInput

              onBlur={this.validarCPF}
              onChange={handleChange("cpf")}
              defaultValue={values.cpf}
              placeholder='CPF Administrador'
              name='cpf_administrador'
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
              guide={true}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.cpf_administrador.msg}</span>

            <p></p>

            <label>E-mail do Administrador</label>

            <p></p>

            <input
              type='text'
              placeholder='E-mail'
              name='email'
              onChange={handleChange("email")}
              defaultValue={values.email}
              onBlur={this.validarEmail}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.email.msg}</span>

            <p></p>

            <label>E-mail do Administrador</label>

            <p></p>

            <MaskedInput placeholder='Celular'
              name='celular'
              onChange={handleChange("celular")}
              defaultValue={values.celular}
              onBlur={this.validarCelular}
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
              guide={true}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.celular.msg}</span>


            <p></p>
            
            <RaisedButton
              label="Continue"
              primary={true}
              style={styles.button}
              onClick={ this.continue}
            />

          </form>

        </React.Fragment>

      </MuiThemeProvider>

    );
  }
}

export default FormUserDetails;
