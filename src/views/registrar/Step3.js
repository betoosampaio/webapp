import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button, FormFeedback } from 'reactstrap';
import SelectBanco from '../../components/SelectBanco';
import { AppSwitch } from '@coreui/react';
import serverRequest from '../../utils/serverRequest';
import MaskedInput from '../../components/MaskedInput';


const stateName = "Step3";

class Step3 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      pagamento_app: 0,
      codigo_banco: "",
      id_tipo_cadastro_conta: "1",
      id_tipo_conta: "",
      agencia: "",
      conta: "",
      digito: "",
      cpfcnpj_conta: "",
    }
  };

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

  changeSwitch = (event) => {
    this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
  }

  changeMultipleSelect = (event) => {
    this.setState({ [event.target.name]: event.target.value[0] });
  }

  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>
        <h4 className="text-center">Dados Bancários</h4>

        <FormGroup className="mt-4">
          <InputGroup>
            <Label>Aceitar pagamentos pelo App:</Label>

            <AppSwitch
              name="pagamento_app"
              className={'mx-3'}
              variant={'pill'}
              color={'success'}
              checked={this.state.pagamento_app ? true : false}
              onChange={this.changeSwitch}
            />

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Instituição: </Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <SelectBanco
              name="codigo_banco"
              value={this.state.codigo_banco}
              onChange={this.changeMultipleSelect}
              disabled={this.state.pagamento_app ? false : true}>
            </SelectBanco>

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
              onChange={this.changeInput}
              disabled={this.state.pagamento_app ? false : true}>
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
              mascara="9999"
              disabled={this.state.pagamento_app ? false : true}
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
              mascara="999999999"
              disabled={this.state.pagamento_app ? false : true}
            />
            <Label> - </Label>
            <MaskedInput
              className="form-control"
              name="digito"
              value={this.state.digito}
              onChange={this.changeInput}
              placeholder="Dígito"
              mascara="SS"
              disabled={this.state.pagamento_app ? false : true}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup check inline>
          <Input
            className="form-check-input"
            type="radio"
            id="cpf-radio"
            name="id_tipo_cadastro_conta"
            value="1"
            checked={this.state.id_tipo_cadastro_conta === "1" ? true : false}
            onChange={this.changeInput}
            onBlur={this.validarCPF}
            disabled={this.state.pagamento_app ? false : true}
            required
          />
          <Label className="form-check-label" check htmlFor="cpf-radio">CPF</Label>
        </FormGroup>

        <FormGroup check inline>
          <Input
            className="form-check-input"
            type="radio"
            id="cnpj-radio"
            name="id_tipo_cadastro_conta"
            value="2"
            checked={this.state.id_tipo_cadastro_conta === "2" ? true : false}
            onChange={this.changeInput}
            onBlur={this.validarCNPJ}
            disabled={this.state.pagamento_app ? false : true}
            required
          />
          <Label className="form-check-label" check htmlFor="cnpj-radio">CNPJ</Label>
        </FormGroup>

        {this.state.id_tipo_cadastro_conta === "1" &&
          <FormGroup>

            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
              </InputGroupAddon>
              <MaskedInput
                className="form-control"
                name="cpfcnpj_conta"
                value={this.state.cpfcnpj_conta}
                onChange={this.changeInput}
                placeholder='000.000.000-00'
                mascara="999.999.999-99"
                disabled={this.state.pagamento_app ? false : true}
              />
            </InputGroup>
          </FormGroup>}

        {this.state.id_tipo_cadastro_conta === "2" &&
          <FormGroup>

            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
              </InputGroupAddon>
              <MaskedInput
                name="cpfcnpj_conta"
                className="form-control"
                value={this.state.cpfcnpj_conta}
                onChange={this.changeInput}
                placeholder='00.000.000/0000-00'
                mascara="99.999.999/9999-99"
                disabled={this.state.pagamento_app ? false : true}
              />
            </InputGroup>
          </FormGroup>}

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step3;