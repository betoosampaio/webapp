import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaPerfil from './ListaPerfil';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

class Perfil extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className='icon-people'></i>&nbsp;Perfis Cadastrados
            <div className="card-header-actions">
              <Link to="/perfil/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-user-follow"></i>&nbsp;Cadastrar
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <ListaPerfil></ListaPerfil>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Perfil;
