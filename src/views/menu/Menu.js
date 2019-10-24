import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaMenu from './ListaMenu';
import { Card, CardHeader, CardBody, Button, InputGroup, Label, FormGroup } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class Produto extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showVisivel: "",
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
            <i className='icon-book-open'></i>&nbsp;Menus Cadastrados
          <div className="card-header-actions">
              <Link to="/cardapio/menu/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-plus"></i>&nbsp;Cadastrar
            </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            
            <FormGroup className="mt-4">
              <InputGroup>
                <Label>Mostrar menus inativos:</Label>
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
            <ListaMenu showVisivel={this.state.showVisivel}></ListaMenu>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Produto;
