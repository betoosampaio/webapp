import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';


class EditarDadosRestaurante extends Component {

  constructor(props) {

    super(props);
    this.state = {
      nome_administrador: "",
      cpf_administrador: "",
      email: "",
      celular: "",
      razao_social: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      municipio: "",
      uf: "",
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
      window.location.href = '#/gerenciar';
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
            <h5><b>Editar dados do restaurante</b></h5>
          </CardHeader>
          <CardBody>

            <FormGroup>
              <Label><b>Razão Social do Restaurante: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="razao_social" value={this.state.razao_social} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label><b>CEP: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="cep" value={this.state.cep} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label><b>Logradouro: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="logradouro" value={this.state.logradouro} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label><b>Número: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="numero" value={this.state.numero} onChange={this.changeInput} type="email" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label><b>Complemento</b> (opcional): </Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="complemento" value={this.state.complemento} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label><b>Bairro: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="bairro" value={this.state.bairro} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label><b>Munícipio: </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="municipio" value={this.state.municipio} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label><b>Estado (UF): </b></Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="uf" value={this.state.uf} onChange={this.changeInput} />
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

export default EditarDadosRestaurante;