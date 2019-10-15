import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaOperador from './ListaOperador';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

class Operador extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className='icon-people'></i>&nbsp;Operadores Cadastrados
            <div className="card-header-actions">
              <Link to="/operador/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-user-follow"></i>&nbsp;Cadastrar
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <ListaOperador></ListaOperador>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Operador;
