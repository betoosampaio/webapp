import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Button, Row, Col, ListGroup,
  ListGroupItem, InputGroup, InputGroupAddon, InputGroupText, Input
} from 'reactstrap'; import { Link } from 'react-router-dom';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import serverRequest from '../../utils/serverRequest';


class Configuracao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxa_servico: '',
      taxa_servicoVlr: '',
      txServicoVisivel: false,
    };
  }

  componentDidUpdate() {
    if (this.props.desconto !== this.state.descontoCadastrado)
      this.setState({
        descontoCadastrado: this.props.desconto,
        desconto: this.props.desconto.toFixed(2).replace('.', ','),
      });

    if (this.props.taxa_servico !== this.state.taxa_servicoCadastrada)
      this.setState({
        taxa_servicoCadastrada: this.props.taxa_servico,
        taxa_servico: String(this.props.taxa_servico * 100).replace('.', ','),
        taxa_servicoVlr: this.props.vlrTxServico,
      });
  }


  changeInputServico = (event) => {
    let taxa_servico = event.target.value.replace('.', '').replace(',', '.');
    let valor = taxa_servico / 100 * (this.props.vlrProdutos);
    this.setState({ taxa_servico: event.target.value, taxa_servicoVlr: valor });
  }

  editarTxServico = async () => {
    let obj = {
      taxa_servico: parseFloat(this.state.taxa_servico.replace('.', '').replace(',', '.')) / 100
     
    }
    let dados = await serverRequest.request('/mesa/editarTaxaServico', obj);
    if (dados) {
      this.setState({ txServicoVisivel: false });
      this.props.atualizou();
    }
  }

  moneyFormat = (valor) => {
    try {
      return `R$ ${valor.toFixed(2)}`;
    } catch{
      return "R$ 0,00";
    }
  }

  render() {
    const { vlrTxServico } = this.props;
    return (

      <Card>

        <CardHeader>
          <i className='icon-settings'></i>&nbsp;<b>Configuração do Restaurante</b>
          <div className="card-header-actions">
            <Link to="/perfil/editarDadosPessoais">

            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <ListGroup>

            <ListGroupItem><b> Taxa de serviço padrão: </b> <MaskedMoneyInput placeholder="teste" /> </ListGroupItem>


            <ListGroupItem><i className="fa fa-wrench mr-2 text-muted" />Taxa de Serviço
                  <Button
                className="pull-right bg-white"
                onClick={() => this.setState({ txServicoVisivel: !this.state.txServicoVisivel })}>
                {this.moneyFormat(vlrTxServico)}
              </Button>
              {
                this.state.txServicoVisivel
                  ? <Row className="mt-4">
                    <Col xs="5">
                      <InputGroup>
                        <InputGroupAddon addonType="append">
                          <InputGroupText>%</InputGroupText>
                        </InputGroupAddon>
                        <MaskedMoneyInput
                          name="taxa_servico"
                          value={this.state.taxa_servico}
                          onChange={this.changeInputServico}
                          placeholder="% Taxa"
                          maxLength='6' />
                      </InputGroup>
                    </Col>
                    <Col xs="5">
                      <Input readonly value={this.moneyFormat(this.state.taxa_servicoVlr)} />
                    </Col>
                    <Col xs="2">
                      <Button onClick={() => this.editarTxServico(this.state._id, this.state.taxa_servico)}>OK</Button>
                    </Col>
                  </Row>
                  : null
              }
            </ListGroupItem>



          </ListGroup>
        </CardBody>
      </Card>


    );
  }
}

export default Configuracao;