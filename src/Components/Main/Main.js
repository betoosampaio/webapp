import React from 'react'
import Form from 'react-bootstrap/Form'

class Main extends React.Component {

  state = {
        formulario: {
        login: '',
        senha: '',
      
    },
};



verificarLogin = async (event) => {
    console.log(this.state.formulario);


    try {
        let res = await fetch('http://localhost:3001/restaurante/checkIfLoginOk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.formulario)
        });
       
    } catch (error) {
        alert('ERRO NO CADASTRO');
        console.log(error);
    }
    
}

formChange = (event) => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[event.target.name] = event.target.value;
    this.setState({ formulario: formNewState });
}

formChangeSelect = name => value => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[name] = value;
    this.setState({ formulario: formNewState });
}


    render() {
        return (

<Form>
<h1> Login </h1>
<p></p>
  <Form.Group controlId="formBasicEmail">

    <Form.Label>Email</Form.Label>
    <Form.Control type="email" name="login" value={this.state.formulario.login} onChange={this.formChange} placeholder="Enter email" />

  </Form.Group>

  <Form.Group controlId="formBasicPassword">

    <Form.Label>Senha</Form.Label>
    <Form.Control type="password" name="senha" value={this.state.formulario.senha} onChange={this.formChange} placeholder="Password" />

  </Form.Group>
  
  <button class="btn btn-primary" onClick={this.verificarLogin} variant="primary" type="submit">
    Submit
  </button>

</Form>

)
        }
}
export default Main