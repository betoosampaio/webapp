import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';

class CadastrarMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numero: "",
    };
  }


  cadastrar = async (event) => {
    event.preventDefault();
    let obj = {
      numero: this.state.numero,
    }

    console.log(obj);

    let dados = await serverRequest.request('/mesa/cadastrar', obj);
    if (dados) {
      window.location.href = '/#/mesas';
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (

      <form name="form" onSubmit={this.cadastrar}>
        <Card>
          <CardHeader>
            <strong>Cadastrar Operador</strong>
          </CardHeader>
          <CardBody>


            <FormGroup>
              <Label>Número da mesa:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-id-card"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="numero" value={this.state.numero} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>


          </CardBody>
          <CardFooter>
            <Button type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> Confirmar</Button>
          </CardFooter>
        </Card>

      </form>

    );
  }
}

export default CadastrarMesa;
