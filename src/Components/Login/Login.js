import React from 'react'
import Form from 'react-bootstrap/Form'

const path = process.env.REACT_APP_SRV_PATH;
const pathWeb = process.env.REACT_APP_WEB_PATH;


class Login extends React.Component {

  state = {
    formulario: {
      codigo_restaurante: '',
      login_operador: '',
      senha_operador: '',

    },
  };


  verificarLogin = async (event) => {
    console.log(this.state.formulario);

    let res = await fetch(path + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(this.state.formulario)
    });
    let sucess = await res.ok;

    if (sucess) {
      alert('LOGADO COM SUCESSO!');
      let token = await res.json();
      localStorage.setItem('token', token);
      window.location.href = pathWeb


    } else {
      let err = await res.json();
      alert('ERRO AO LOGAR: ' + err);
      localStorage.removeItem('token');
    }


  }



  formChange = (event) => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[event.target.name] = event.target.value;
    this.setState({ formulario: formNewState });
  }

  render() {
    return (

      <form>

        <div class="input-block">

          <label for="login-email">Insira o código do Restaurante</label>

          <input
            type="text"
            name="codigo_restaurante"
            value={this.state.formulario.codigo_restaurante}
            onChange={this.formChange}
            placeholder="Login do Restaurante" />


          <label for="login-email">Email</label>

          <input
            type="text"
            name="login_operador"
            value={this.state.formulario.login_operador}
            onChange={this.formChange}
            placeholder="Login" />

        </div>


        <div class="input-block">
            <label for="login-password">Password</label>
            <input  type="password"
            name="senha_operador"
            value={this.state.formulario.senha_operador}
            onChange={this.formChange}
            placeholder="Password"/>
        </div>
        

        <button
          class="btn-login"
          onClick={this.verificarLogin}
          variant="primary"
          type="button">
          Entrar
        </button>

        
        <p class="message">Não tem cadastro?
        <a href= '/SignIn'> Criar conta</a></p>
        
        
         
      </form>

    )
  }
}
export default Login