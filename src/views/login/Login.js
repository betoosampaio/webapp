import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';

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
    let token = await serverRequest.request('/login', this.state);
    if (token) {
      localStorage.setItem('token', token);
      window.location.href = process.env.REACT_APP_WEB_PATH;
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
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
                          onChange={this.changeInput} />
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
                          onChange={this.changeInput} />
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
                          onChange={this.changeInput} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Esqueceu a senha?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Cadastre-se!</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/registrar">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Registrar Agora!</Button>
                      </Link>
                    </div>
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