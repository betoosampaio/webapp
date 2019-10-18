import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

const stateName = "Step2";

class Step2 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      municipio: "",
      uf: "",
      complemento: ""
    }

  }

  prosseguir = (event) => {
    event.preventDefault();
    this.props.saveValues(stateName, this.state);
    this.props.nextStep();
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
        <h4 className="text-center">Endereço do restaurante</h4>

        <FormGroup>
          <Label>CEP:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="cep" value={this.state.cep} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Logradouro:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="logradouro" value={this.state.logradouro} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Número:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="numero" value={this.state.numero} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Bairro:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="bairro" value={this.state.bairro} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Município:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="municipio" value={this.state.municipio} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>UF:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="uf" value={this.state.uf} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Complemento:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-cursor"></i></InputGroupText>
            </InputGroupAddon>
            <Input name="complemento" value={this.state.complemento} onChange={this.changeInput} />
          </InputGroup>
        </FormGroup>

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step2;
