import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';


class EditarDadosRestaurante extends Component {

  constructor(props) {

    super(props);
    this.state = {
      razao_social: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      municipio: "",
      uf: "",

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
    let dados = await serverRequest.request('/gerenciar/restaurante/editar/restaurante', this.state);
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
            <strong>Editar dados do restaurante</strong>
          </CardHeader>
          <CardBody>

            <FormGroup>
              <Label>Razão Social do Restaurante:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="razao_social" value={this.state.razao_social} onChange={this.changeInput} required minLength="4" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Logradouro:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="logradouro" value={this.state.logradouro} onChange={this.changeInput} required minLength="11" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Número:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="numero" value={this.state.numero} onChange={this.changeInput} type="email" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Complemento (opcional):</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="complemento" value={this.state.complemento} onChange={this.changeInput} required minLength="13" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Bairro:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="bairro" value={this.state.bairro} onChange={this.changeInput} required minLength="13" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Munícipio:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="municipio" value={this.state.municipio} onChange={this.changeInput} required minLength="13" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Estado (UF):</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="uf" value={this.state.uf} onChange={this.changeInput} required minLength="13" />
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
