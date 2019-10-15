import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaProduto from './ListaProduto';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

class Produto extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className='icon-book-open'></i>&nbsp;Produtos Cadastrados
          <div className="card-header-actions">
              <Link to="/cardapio/produto/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-plus"></i>&nbsp;Cadastrar
            </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <ListaProduto></ListaProduto>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Produto;
