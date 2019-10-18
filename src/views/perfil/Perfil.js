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
            <i className='icon-people'></i>&nbsp;Dados Usuário
            <div className="card-header-actions">
              <Link to="/perfil/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-user-follow"></i>&nbsp;Cadastrar
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
            <i className='icon-people'></i>&nbsp;Dados do Restaurante
            <div className="card-header-actions">
              <Link to="/perfil/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-user-follow"></i>&nbsp;Cadastrar
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
            <i className='icon-people'></i>&nbsp;Dados Bancário
            <div className="card-header-actions">
              <Link to="/perfil/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-user-follow"></i>&nbsp;Cadastrar
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
