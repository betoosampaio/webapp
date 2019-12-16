import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, InputGroup, InputGroupAddon, Footer } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import 'react-toastify/dist/ReactToastify.css';
import SelectAmbiente from '../../components/SelectAmbiente';

import CardControle from './CardControle';


class ListaControle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_produto: "",
      lista: [],
      id_ambiente: 1,
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    let dados = await serverRequest.request('/mesa/item/listaPrepararAmbiente', ({ id_ambiente: parseInt(this.state.id_ambiente) }));
    if (dados) {
      this.setState({ lista: dados });
    }
  }


  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;

  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => { this.obterLista() });
  }

  render() {

    return (
      <>
        <Row size="sm" >
          <FormGroup>
            <InputGroup>
              <Label>Escolha um ambiente: </Label>
              <InputGroupAddon addonType="append">
              </InputGroupAddon>
              <SelectAmbiente
                required
                name="id_ambiente"
                value={this.state.id_ambiente}
                onChange={this.changeInput}
                ignorarnenhum={true}
              >
              </SelectAmbiente>
            </InputGroup>
          </FormGroup>
        </Row>
        <p></p>
        <Row>
          {
            this.state.lista.map((obj) => {
              return (
                <Col xs="12" sm="6" lg="3" key={obj}>
                  <CardControle pedido={obj} atualizar={this.obterLista} />
                </Col>
              );
            })
          }
        </Row>
      </>
    );
  }
}

export default ListaControle;