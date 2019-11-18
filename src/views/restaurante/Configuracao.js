import React, { Component } from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';

class Configuracao extends Component {

  render() {
    return (

      <Card>

        <CardHeader>
          <i className='icon-settings'></i>&nbsp;<b>Configuração do Restaurante</b>
          <div className="card-header-actions">
            <Link to="/perfil/editarDadosPessoais">

            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <ListGroup>

            <ListGroupItem><b> Taxa de serviço padrão: </b> <MaskedMoneyInput placeholder="teste" /> </ListGroupItem>

          </ListGroup>
        </CardBody>
      </Card>


    );
  }
}

export default Configuracao;