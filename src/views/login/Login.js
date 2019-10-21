import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      codigo_restaurante: '',
      login_operador: '',
      senha_operador: '',
    }
  }

  componentDidMount() {
    localStorage.removeItem('token');
  }

  logar = async (event) => {
    event.preventDefault();

    try {
      let res = await fetch(process.env.REACT_APP_SRV_PATH + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(this.state)
      });

      if (res.status === 200) {
        let token = await res.json();
        localStorage.setItem('token', token);
        window.location.href = '/';
      }
      else {
        let msgErro = await res.text();
        alert(`${res.status}: ${msgErro}`);
      }
    } catch (err) {
      alert('Erro de conexão com o servidor');
    }

  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center bg">
        <Container>
          <Row className="col-sm">
            <Col sm="8" md="6" lg="4">
              <CardGroup>
                <Card className="p-6">
                  <CardBody>
                    <Form onSubmit={this.logar}>
                      <h1>Login</h1>
                      <p className="text-muted">Entre com seu usuário e senha</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-cutlery"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Código Restaurante"
                          autoComplete="codrestaurante"
                          name="codigo_restaurante"
                          value={this.state.codigo_restaurante}
                          onChange={this.changeInput} required />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Usuário"
                          autoComplete="usuario"
                          name="login_operador"
                          value={this.state.login_operador}
                          onChange={this.changeInput} required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Senha"
                          autoComplete="current-password"
                          name="senha_operador"
                          value={this.state.senha_operador}
                          onChange={this.changeInput} required/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Esqueceu a senha?</Button>
                        </Col>
                        <Col xs="12" className="text-right">
                          <Button color="link"  className="px-0" onClick={() => {window.location.href="http://localhost:3000/#/registrar"}}>Registrar-se</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;