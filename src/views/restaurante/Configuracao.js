import React, { Component } from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button, CardFooter } from 'reactstrap';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import serverRequest from '../../utils/serverRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Configuracao extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taxa_servico: '',
      mostrar: '1',
    }
  }


  componentDidMount() {
    this.obter();
  }

  obter = async (event) => {
    let dados = await serverRequest.request('/restaurante/obter/configuracoes');

    if (dados) {


      this.setState({
        taxa_servico: (dados.taxa_servico * 100).toFixed(2).replace('.', ','),
      });
    }
  }

  editarConfiguracoes = async (event) => {
    event.preventDefault();

    let obj = {
      taxa_servico: parseFloat(this.state.taxa_servico.replace('.', '').replace(',', '.')) / 100
    }
    let dados = await serverRequest.request('/restaurante/editar/configuracoes', obj);
    if (dados) {
      toast("Dados atualizados com sucesso!", { className: "toast-success" });
    }
  }

  changeInputServico = (event) => {
    let taxa_servico = event.target.value.replace('.', '').replace(',', '.');
    let valor = taxa_servico / 100 * (this.props.vlrProdutos);
    if (taxa_servico <= 100) {
      this.setState({ taxa_servico: event.target.value, taxa_servicoVlr: valor })
    }
  }



  render() {
    return (

      <form onSubmit={this.editarConfiguracoes}>
        <ToastContainer />
        <Card>
          <CardHeader>
            <i className='icon-settings'></i>&nbsp;<b>Configuração do Restaurante</b>
            <div className="card-header-actions">
            </div>
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem> <b> Taxa de serviço padrão: </b>
                <MaskedMoneyInput
                  name="taxa_servico"
                  value={this.state.taxa_servico}
                  onChange={this.changeInputServico}
                  placeholder="10,00"


                />
              </ListGroupItem>
            </ListGroup>
          </CardBody>
          <CardFooter>
            <Button className="pull-right" variant="primary" color="success" type="submit" >Confirmar</Button>
          </CardFooter>
        </Card>
      </form >
    );
  }
}

export default Configuracao;