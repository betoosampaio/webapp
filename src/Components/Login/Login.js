import React from 'react'
import Form from 'react-bootstrap/Form'
const path = process.env.REACT_APP_SRV_PATH;

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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.formulario)
    });
    let sucess = await res.ok;

    if (sucess) {
      alert('LOGADO COM SUCESSO!');
      let token = await res.json();
      localStorage.setItem('token', token);
      

    } else {
      let err = await res.json();
      alert('ERRO AO LOGAR: ' + err.msg);
    }

  }

  formChange = (event) => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[event.target.name] = event.target.value;
    this.setState({ formulario: formNewState });
  }

  render() {
    return (

      <Form>
        <h1> Login </h1>
        <p></p>
        <Form.Group>
          <Form.Label>Codigo do Restaurante</Form.Label>
          <Form.Control
            type="text"
            name="codigo_restaurante"
            value={this.state.formulario.codigo_restaurante}
            onChange={this.formChange}
            placeholder="Login do Restaurante" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            name="login_operador"
            value={this.state.formulario.login_operador}
            onChange={this.formChange}
            placeholder="Login" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="senha_operador"
            value={this.state.formulario.senha_operador}
            onChange={this.formChange}
            placeholder="Password" />
        </Form.Group>

        <button
          class="btn btn-primary"
          onClick={this.verificarLogin}
          variant="primary"
          type="button">
          Submit
        </button>

      </Form>

    )
  }
}
export default Login