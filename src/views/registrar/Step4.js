import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

const stateName = "Step4";

class Step4 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      codigo_restaurante: '',
      login: '',
      senha: '',
      validacao: {
        codigo_restaurante: { ok: true, msg: '' },
        login: { ok: true, msg: '' },
        senha: { ok: true, msg: '' },
      },
    }

  }

  prosseguir = (event) => {
    event.preventDefault();

    let ok = true;

    Object.keys(this.state.validacao).forEach(p => {
      if (!this.state.validacao[p].ok) {
        alert('Preencha todos os campos corretamente');
        ok = false;
        return;
      }
    });

    if (ok) {
      this.props.saveValues(stateName, this.state, () => {
        this.props.cadastrar();
      });
    }

  }

  retornar = () => {
    this.props.saveValues(stateName, this.state);
    this.props.previousStep();
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>
        <h4 className="text-center">Acesso ao sistema</h4>

        <FormGroup>
          <Label>codigo_restaurante:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="codigo_restaurante" value={this.state.codigo_restaurante} onChange={this.changeInput} placeholder="restaurante_freedapp" required />
            <span style={{ color: 'red' }}>{this.state.validacao.codigo_restaurante.msg}</span>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Login:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="login" value={this.state.login} onChange={this.changeInput} placeholder="Administrador" required />
            <span style={{ color: 'red' }}>{this.state.validacao.login.msg}</span>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Senha:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-user"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="password" name="senha" value={this.state.senha} onChange={this.changeInput} placeholder="Senha" required />
            <span style={{ color: 'red' }}>{this.state.validacao.senha.msg}</span>
          </InputGroup>
        </FormGroup>

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button onClick={this.cadastrarRestaurante} type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> FInalizar</Button>

      </Form>
    );
  }
}

export default Step4;
