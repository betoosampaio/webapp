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
              <ListGroupItem><b>Nome administrador:</b> {this.state.dados.nome_administrador}</ListGroupItem>
              <ListGroupItem><b>CPF administrador:</b> {this.state.dados.cpf_administrador}</ListGroupItem>
              <ListGroupItem><b>Email:</b> {this.state.dados.email}</ListGroupItem>
              <ListGroupItem><b>Celular:</b> {this.state.dados.celular}</ListGroupItem>
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
              <ListGroupItem><b>Cnpj: </b>{this.state.dados.cnpj}</ListGroupItem>
              <ListGroupItem><b>Razão social: </b>{this.state.dados.razao_social}</ListGroupItem>
              <ListGroupItem><b>CEP: </b>{this.state.dados.cep}</ListGroupItem>
              <ListGroupItem>
              <b>Endereço: </b>{this.state.dados.logradouro}
              <b>, </b>{this.state.dados.numero}
              <b> - Complemento: </b>{this.state.dados.complemento}
              <b> - Bairro: </b>{this.state.dados.bairro}
              </ListGroupItem>      
               <ListGroupItem><b>Munícipio: </b>{this.state.dados.municipio}
               <b> - Estado: </b>{this.state.dados.uf}
              </ListGroupItem>
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
              <ListGroupItem><b>Banco: </b>{this.state.dados.codigo_banco} - {this.state.dados.nome_banco}</ListGroupItem>
              <ListGroupItem><b>Tipo cadastro conta: </b>{this.state.dados.tipo_cadastro_conta}</ListGroupItem>
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