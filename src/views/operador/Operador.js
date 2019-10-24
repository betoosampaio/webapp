import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaOperador from './ListaOperador';
import { Card, CardHeader, CardBody, Button, Label, FormGroup, InputGroup } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class Operador extends Component {

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

            <FormGroup className="mt-4">
              <InputGroup>

                <Label>Mostrar operadores inativos:</Label>
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




            <ListaOperador showVisivel={this.state.showVisivel}></ListaOperador>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Operador;
