import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaProduto from './ListaProduto';
import { Card, CardHeader, CardBody, Button, Label, FormGroup, InputGroup } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class Produto extends Component {

  constructor(props) {
    super(props);


    this.state = {
      showVisivel: false,
    };
  }

  changeSwitch = (event) => {
    this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
  }

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
            <FormGroup className="pull-right">
              <InputGroup>

                <Label>Mostrar produtos inativos:</Label>
                <AppSwitch
                  name="showVisivel"
                  className={'mx-3'}
                  variant={'pill'}
                  color={'success'}
                  checked={this.state.showVisivel ? true : false}
                  onChange={this.changeSwitch}
                />

              </InputGroup>
            </FormGroup>
            <ListaProduto showVisivel={this.state.showVisivel}></ListaProduto>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Produto;
