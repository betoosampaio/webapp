import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

const stateName = "Step1";

class Step1 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      cnpj: "",
      razao_social: "",
      nome_restaurante: "",
      codigo_restaurante: "",
    }
  }

  prosseguir = (event) => {
    event.preventDefault();
    this.props.saveValues(stateName, this.state);
    this.props.nextStep();
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>
        <h4 className="text-center">Dados do restaurante</h4>

        <FormGroup>
          <Label>CNPJ:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-pencil"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="cnpj" value={this.state.cnpj} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Razão Social:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-pencil"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="razao_social" value={this.state.razao_social} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Nome Fantasia:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-pencil"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="nome_restaurante" value={this.state.nome_restaurante} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Código do Restaurante:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-pencil"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="codigo_restaurante" value={this.state.codigo_restaurante} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step1;
