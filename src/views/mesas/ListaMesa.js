import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import CardMesa from './CardMesa';


class ListaMesa extends Component {

  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      desconto: '',
      taxa_servico: '',
      confirmFecharConta: false,
      lista: [],
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    let dados = await serverRequest.request('/mesa/listar');
    console.log(dados);
    if (dados) {
      this.setState({ lista: dados });
    }
  }


  dateDif = (dataIni, dataFim) => {

    var dateFuture = dataIni;

    console.log(dateFuture);

    var dateNow = dataFim;

    console.log(dataFim);

    var delta = Math.abs(dateFuture - dateNow) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    return (hours + "h " + minutes + "m");

  }



  remover = async (id_mesa) => {
    let dados = await serverRequest.request('/mesa/fechar', { "id_mesa": id_mesa });
    if (dados) {
      this.obterLista();
      this.setState({ showDelete: false });
    }
  }


  render() {
    return (
      <div>



        <Link to="/mesas/cadastrar">
          <Button color="success" size="sm">
            <i className="icon-plus"></i>&nbsp;Nova Mesa
            </Button>
        </Link>

        <p></p>

        <Row>
          {
            this.state.lista.map((obj) => {

              return (


                <Col xs="12" sm="6" lg="3">


                  <Modal
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.confirmFecharConta}
                    onHide={() => { this.setState({ confirmFecharConta: false }) }}
                    backdrop='static'
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Fechamento da Conta
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Confirmar o fechamento da conta?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => this.remover(obj._id)} >Close</Button>
                    </Modal.Footer>
                  </Modal>

                  <CardMesa
                    header={"Mesa " + obj.numero}
                    mainText={this.dateDif(new Date(obj.data_abertura), new Date())}
                    valorTotal="R$ 20,50"
                    fecharMesa={
                      <Button color="success" size="md" onClick={() => this.setState({ confirmFecharConta: true })}>
                        <i className="fa fa-shopping-cart"></i>
                      </Button>
                    }

                    color="primary"
                    footer link={`/#/mesas/detalhemesa/${obj._id}`}
                />

                </Col>


              );
            })

          }
        </Row>


      </div>
    );
  }
}

export default ListaMesa;
