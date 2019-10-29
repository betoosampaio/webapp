import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import CardMesa from './CardMesa';


class ListaMesa extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lista: [],
      cronometro: "",
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

    // what's left is seconds
    var seconds = delta % 60;  // in theory the modulus is not required

   return(hours + "h " +  minutes + "m");

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

                  <CardMesa
                    header={"Mesa " + obj.numero}
                    mainText={"Aberta a " + this.dateDif(new Date(obj.data_abertura) ,  new Date())}
                    valorTotal="Valor total: R$ 20,50"
                    color="primary"
                    footer link="#/gerenciar/detalhemesa"
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
