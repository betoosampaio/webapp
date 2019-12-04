import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import { Card, CardHeader, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap';
import FotoRestaurante from '../../components/FotoRestaurante';


class DadosRestaurante extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dados: {},
      imagem: "",
    };
  }

  componentDidMount() {
    this.obterDados();
  }

  obterDados = async () => {
    let dados = await serverRequest.request('/restaurante/obter');

    if (dados) {

      let obj = dados[0];


      obj.cpf_administrador = obj.cpf_administrador.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      obj.celular = obj.celular.toString().replace(/(\d{2})(\d{5})(\d{3})/, "($1) $2-$3");
      obj.cnpj = obj.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      obj.cep = obj.cep.replace(/(\d{5})(\d{3})/, "$1-$2");

      this.setState({ dados: obj });

    }
  }


  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className='icon-people'></i>&nbsp;<b>Dados Usuário</b>
            <div className="card-header-actions">
              <Link to="/restaurante/editarDadosPessoais">
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
              <Link to="/restaurante/editarDadosRestaurante">
                <Button color="secondary" size="sm">
                  <i className="icon-note"></i>&nbsp;Editar
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem> <b>Logo do restaurante: </b>               
                <FotoRestaurante src={this.state.dados.imagem} height="50" width="50"></FotoRestaurante>
              </ListGroupItem>
              <ListGroupItem><b>CNPJ: </b>{this.state.dados.cnpj}</ListGroupItem>
              <ListGroupItem><b>Especialidade: </b>{this.state.dados.ds_especialidade}</ListGroupItem>
              <ListGroupItem><b>Razão social: </b>{this.state.dados.razao_social}</ListGroupItem>
              <ListGroupItem><b>CEP: </b>{this.state.dados.cep}</ListGroupItem>
              <ListGroupItem>
                <b>Endereço: </b>{this.state.dados.logradouro}
                <b>, </b>{this.state.dados.numero}
                <b> </b>{this.state.dados.complemento}
                <b> - </b>{this.state.dados.bairro}
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
              <Link to="/restaurante/editarDadosBancario">
                <Button color="secondary" size="sm">
                  <i className="icon-note"></i>&nbsp;Editar
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem><b>Aceita pagamentos pelo App: </b> {this.state.dados.pagamento_app === 1 ? 'Sim' : 'Não'} </ListGroupItem>
            </ListGroup>

            {this.state.dados.pagamento_app === 1 &&
              <ListGroup>
                <ListGroupItem><b>Banco: </b>{this.state.dados.codigo_banco} - {this.state.dados.nome_banco}</ListGroupItem>
                <ListGroupItem><b>Tipo cadastro conta: </b>{this.state.dados.tipo_cadastro_conta}</ListGroupItem>
                <ListGroupItem><b>Tipo conta: </b>{this.state.dados.tipo_conta}</ListGroupItem>
                <ListGroupItem><b>Agência: </b>{this.state.dados.agencia}</ListGroupItem>
                <ListGroupItem><b>Conta: </b>{this.state.dados.conta} - {this.state.dados.digito}</ListGroupItem>
              </ListGroup>}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DadosRestaurante;