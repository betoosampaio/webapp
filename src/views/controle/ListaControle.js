import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import 'react-toastify/dist/ReactToastify.css';
import CardControle from './CardControle';


class ListaControle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalInfoProduto: false,
      id_produto: "",
      lista: [],


    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    let dados = await serverRequest.request('/mesa/item/listaPrepararAmbiente', ({ id_ambiente: 1 }));
    if (dados) {
      this.setState({ lista: dados });
    }
  }


  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;

  }

  render() {


    return (
      <>
        <Row size="sm" >
          Escolha um ambiente:
        </Row>
        <p></p>
        <Row>
          {
            this.state.lista.map((obj) => {
              return (
                <Col xs="12" sm="6" lg="3" key={obj.id_item}>
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