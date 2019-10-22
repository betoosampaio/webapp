import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';
import MaskedInput from 'react-text-mask';
import SelectBanco from '../../components/selectBanco/SelectBanco'


class EditarDadosBancarios extends Component {

  constructor(props) {

    super(props);
    this.state = {
      codigo_banco: "",
      id_tipo_cadastro_conta: "",
      id_tipo_conta: "",
      agencia: "",
      conta: "",
      digito: "",
    };
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/restaurante/obter', { "id_restaurante": id });
    if (dados) {
      this.setState(dados[0]);
    }
  }

  editar = async (event) => {
    event.preventDefault();
    let dados = await serverRequest.request('/restaurante/editar', this.state);
    if (dados) {
      window.location.href = '#/perfil';
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeSwitch = (event) => {
    this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
  }




  render() {
    return (

      <form name="form" onSubmit={this.editar}>
        <Card>
          <CardHeader>
            <h5><b>Editar dados bancários</b></h5>
          </CardHeader>
          <CardBody>

            <FormGroup>
              <Label><b>Banco: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <SelectBanco
                  required
                  name="codigo_banco"
                  value={this.state.codigo_banco}
                  onChange={this.changeInput}>
                </SelectBanco>
              </InputGroup>
            </FormGroup>


            

            <FormGroup>
              <Label><b>ID da conta: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input
                  required
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
              <Label><b>Tipo da conta: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input
                  required
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
              <Label><b>Agência: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="agencia" value={this.state.agencia} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label><b>Conta: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="conta" value={this.state.conta} onChange={this.changeInput} minLength="4" required />  <Label> <b> - </b> </Label> <Input name="digito" value={this.state.digito} onChange={this.changeInput} rminLength="1" required />
              </InputGroup>
            </FormGroup>

          </CardBody>
          <CardFooter>
            <Button type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> Confirmar</Button>
          </CardFooter>
        </Card>
      </form >

    );
  }
}

export default EditarDadosBancarios;