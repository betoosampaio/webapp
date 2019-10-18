import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';


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
    let dados = await serverRequest.request('/gerenciar/restaurante/editar/bancario', this.state);
    if (dados) {
     
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
            <strong>Editar dados bancários</strong>
          </CardHeader>
          <CardBody>

            <FormGroup>
              <Label>Código do banco:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="codigo_banco" value={this.state.codigo_banco} onChange={this.changeInput} required minLength="4" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>ID da conta:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="id_tipo_cadastro_conta" value={this.state.id_tipo_cadastro_conta} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Tipo da conta:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="id_tipo_conta" value={this.state.id_tipo_conta} onChange={this.changeInput} type="email" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Agência:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="agencia" value={this.state.agencia} onChange={this.changeInput} required minLength="13" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Conta:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="conta" value={this.state.conta} onChange={this.changeInput} required minLength="13" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Digito:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="digito" value={this.state.digito} onChange={this.changeInput} required minLength="13" />
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

export default EditarDadosBancarios;
