import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DadosUsuario from './DadosUsuario';
import DadosBancario from './DadosBancario';
import DadosRestaurante from './DadosRestaurante';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

class Perfil extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className='icon-people'></i>&nbsp;<b>Dados Usuário</b>
            <div className="card-header-actions">
            <Link to="/perfil/editarDadosPessoais">
                <Button color="secondary" size="sm">
                  <i className="icon-note"></i>&nbsp;Editar
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <DadosUsuario></DadosUsuario>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <i className='icon-cup'></i>&nbsp;<b>Dados do Restaurante</b>
            <div className="card-header-actions">
            <Link to="/perfil/editarDadosRestaurante">
                <Button color="secondary" size="sm">
                  <i className="icon-note"></i>&nbsp;Editar
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <DadosRestaurante></DadosRestaurante>
          </CardBody>
        </Card>


        <Card>
          <CardHeader>
            <i className='icon-credit-card'></i>&nbsp;<b>Dados Bancário</b>
            <div className="card-header-actions">
            <Link to="/perfil/editarDadosBancario">
                <Button color="secondary" size="sm">
                  <i className="icon-note"></i>&nbsp;Editar
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <DadosBancario></DadosBancario>
          </CardBody>
        </Card>




      </div>


    );
  }
}

export default Perfil;
