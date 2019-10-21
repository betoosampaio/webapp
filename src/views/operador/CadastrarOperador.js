import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import SelectPerfil from '../../components/selectPerfil/SelectPerfil'
import serverRequest from '../../utils/serverRequest';

class CadastrarOperador extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome_operador: "",
      id_perfil: "",
      login_operador: "",
      senha_operador: "",
    };
  }

  cadastrar = async (event) => {
    event.preventDefault();
    let dados = await serverRequest.request('/operador/cadastrar', this.state);
    if (dados) {
      window.location.href = '#/operador';
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }



  render() {
    return (
      <form name="form" onSubmit={this.cadastrar}>
        <Card>
          <CardHeader>
            <strong>Cadastrar Operador</strong>
          </CardHeader>
          <CardBody>

            <FormGroup>
              <Label>Nome:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="nome_operador" value={this.state.nome_operador} onChange={this.changeInput} required minLength="4" placeholder="Nome do Operador" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Perfil:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-group"></i></InputGroupText>
                </InputGroupAddon>
                <SelectPerfil name="id_perfil" value={this.state.id_perfil} onChange={this.changeInput} required></SelectPerfil>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Login:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-id-card"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="login_operador" value={this.state.login_operador} onChange={this.changeInput} required placeholder="gerente" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Senha:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-key"></i></InputGroupText>
                </InputGroupAddon>
                <Input type="password" name="senha_operador" value={this.state.senha_operador} onChange={this.changeInput} required placeholder="senha" />
              </InputGroup>
            </FormGroup>

          </CardBody>
          <CardFooter>
            <Button type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> Confirmar</Button>
          </CardFooter>
        </Card>
      </form>
    );
  }
}

export default CadastrarOperador;
