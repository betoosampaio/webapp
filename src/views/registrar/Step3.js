import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import SelectBanco from '../../components/selectBanco/SelectBanco'

const stateName = "Step3";

class Step3 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      codigo_banco: "",
      id_tipo_cadastro_conta: "",
      id_tipo_conta: "",
      agencia: "",
      conta: "",
      digito: "",
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
        <h4 className="text-center">Dados Bancários</h4>

        <FormGroup>
          <Label>Banco:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <SelectBanco
              name="codigo_banco"
              value={this.state.codigo_banco}
              onChange={this.changeInput}>
            </SelectBanco>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Cadastro de Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              type="select"
              name="id_tipo_cadastro_conta"
              value={this.state.id_tipo_cadastro_conta}
              onChange={this.changeInput}>
              <option value="0">Selecione</option>
              <option value="1">Pessoa Física</option>
              <option value="2">Pessoa Jurídica</option>
            </Input>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <Input
              type="select"
              name="id_tipo_conta"
              value={this.state.id_tipo_conta}
              onChange={this.changeInput}>
              <option value="0">Selecione</option>
              <option value="1">Conta Corrente</option>
              <option value="2">Conta Poupança</option>
            </Input>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Agencia:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput
              className="form-control"
              name="agencia"
              placeholder="Agência"
              value={this.state.agencia}
              onChange={this.changeInput}
              mask={[/\d/, /\d/, /\d/, /\d/]}
            />

          </InputGroup>
        </FormGroup>



        <FormGroup>
          <Label>Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>
            <MaskedInput
              className="form-control"
              name="conta"
              value={this.state.conta}
              onChange={this.changeInput}
              placeholder="Conta"
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
            />
            <MaskedInput
              className="form-control"
              name="digito"
              value={this.state.digito}
              onChange={this.changeInput}
              placeholder="Dígito"
              mask={[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/]}
              guide={false}
            />

          </InputGroup>
        </FormGroup>

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step3;
