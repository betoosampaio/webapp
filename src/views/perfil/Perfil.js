import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import { Card, CardHeader, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap';

class Perfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dados: {},
    };
  }

  componentDidMount() {
    this.obterDados();
  }

  obterDados = async () => {
    let dados = await serverRequest.request('/restaurante/obter');
    if (dados) {
      this.setState({ dados: dados[0] });
    }
  }


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
            <ListGroup>
              <ListGroupItem><b>Celular:</b> {this.state.dados.celular}</ListGroupItem>
              <ListGroupItem><b>Email:</b> {this.state.dados.email}</ListGroupItem>
              <ListGroupItem><b>CPF administrador:</b> {this.state.dados.cpf_administrador}</ListGroupItem>
              <ListGroupItem><b>Nome administrador:</b> {this.state.dados.nome_administrador}</ListGroupItem>
            </ListGroup>
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
            <ListGroup>
              <ListGroupItem><b>Razão social: </b>{this.state.dados.razao_social}</ListGroupItem>
              <ListGroupItem><b>CEP: </b>{this.state.dados.cep}</ListGroupItem>
              <ListGroupItem><b>Logradouro: </b>{this.state.dados.logradouro}</ListGroupItem>
              <ListGroupItem><b>Número: </b>{this.state.dados.numero}</ListGroupItem>
              <ListGroupItem><b>Complemento: </b>{this.state.dados.complemento}</ListGroupItem>
              <ListGroupItem><b>Bairro: </b>{this.state.dados.bairro}</ListGroupItem>
              <ListGroupItem><b>Estado: </b>{this.state.dados.estados}</ListGroupItem>
              <ListGroupItem><b>Munícipio: </b>{this.state.dados.municipio}</ListGroupItem>
            </ListGroup>

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
            <ListGroup>
              <ListGroupItem><b>Banco: </b>{this.state.dados.codigo_banco}</ListGroupItem>
              <ListGroupItem><b>Tipo cadastro conta: </b>{this.state.dados.tipoCadastroConta}</ListGroupItem>
              <ListGroupItem><b>Tipo conta: </b>{this.state.dados.tipo_conta}</ListGroupItem>
              <ListGroupItem><b>Agência: </b>{this.state.dados.agencia}</ListGroupItem>
              <ListGroupItem><b>Conta: </b>{this.state.dados.conta} - {this.state.dados.digito}</ListGroupItem>
            </ListGroup>

          </CardBody>
        </Card>




      </div>


    );
  }
}

export default Perfil;
