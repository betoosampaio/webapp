import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Button, Row, Col, ListGroup,
  ListGroupItem, InputGroup, InputGroupAddon, InputGroupText, FormFeedback
} from 'reactstrap';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import MaskedNumberInput from '../../components/MaskedNumberInput';
import serverRequest from '../../utils/serverRequest';

class DetalheMesaResumo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taxa_servico: '',
      desconto: '',
      txServicoVisivel: false,
      descontoVisivel: false,
    };
  }

  componentDidUpdate() {
    let desconto = this.props.desconto;
    let taxa_servico = this.props.taxa_servico;
    //this.setState({desconto: desconto, taxa_servico: taxa_servico})
  }

  changeInputDesconto = (event) => {
    let desconto = event.target.value.replace('.', '').replace(',', '.');
    let valor = desconto / 100 * this.props.vlrProdutos;
    valor = valor.toFixed(2).replace('.', ',');
    this.setState({ desconto: event.target.value, descontoVlr: valor });
  }

  changeInputServico = (event) => {
    let taxa_servico = event.target.value.replace('.', '').replace(',', '.');
    let valor = taxa_servico / 100 * this.props.vlrProdutos;
    valor = valor.toFixed(2).replace('.', ',');
    this.setState({ taxa_servico: event.target.value, taxa_servicoVlr: valor });
  }

  editarDesconto = async () => {
    let obj = {
      desconto: parseFloat(this.state.desconto.replace('.', '').replace(',', '.')) / 100,
      id_mesa: this.props.id_mesa,
    }
    let dados = await serverRequest.request('/mesa/editarDesconto', obj);
    if (dados) {
      this.setState({ descontoVisivel: false });
      this.props.atualizou();
    }
  }

  editarTxServico = async () => {
    let obj = {
      taxa_servico: parseFloat(this.state.taxa_servico.replace('.', '').replace(',', '.')) / 100,
      id_mesa: this.props.id_mesa,
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
    const { novoProduto, vlrProdutos, vlrTxServico, vlrDesconto, vlrTotal } = this.props;
    return (
      <Card>
        <CardHeader><i className='icon-calculator'></i>Resumo
              </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem>
              <i className="fa fa-cutlery mr-2 text-muted" />Produtos
                  <Button
                className="pull-right bg-white"
                onClick={novoProduto}>
                {this.moneyFormat(vlrProdutos)}
              </Button>
            </ListGroupItem>
            <ListGroupItem><i className="fa fa-dollar mr-2 text-muted" />Desconto
                  <Button
                className="pull-right bg-white"
                onClick={() => this.setState({ descontoVisivel: !this.state.descontoVisivel })}>
                {this.moneyFormat(vlrDesconto)}
              </Button>
              {this.state.descontoVisivel
                ? <Row className="mt-4">
                  <Col xs="5">
                    <InputGroup>
                      <InputGroupAddon addonType="append">
                        <InputGroupText>%</InputGroupText>
                      </InputGroupAddon>
                      <MaskedMoneyInput
                        name="desconto"
                        value={this.state.desconto}
                        onChange={this.changeInputDesconto}
                        placeholder="% Desconto" />
                    </InputGroup>
                  </Col>
                  <Col xs="5">
                    <InputGroup>
                      <InputGroupAddon addonType="append">
                        <InputGroupText>R$</InputGroupText>
                      </InputGroupAddon>
                      <MaskedMoneyInput
                        name="descontoVlr"
                        value={this.state.descontoVlr}
                        placeholder="R$ 0,00"
                        disabled={true} />
                    </InputGroup>
                  </Col>
                  <Col xs="2">
                    <Button onClick={() => this.editarDesconto(this.state._id, this.state.desconto)}>OK</Button>
                  </Col>
                </Row>
                : null
              }
            </ListGroupItem>
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
                          placeholder="% Taxa" />
                      </InputGroup>
                    </Col>
                    <Col xs="5">
                      <InputGroup>
                        <InputGroupAddon addonType="append">
                          <InputGroupText>R$</InputGroupText>
                        </InputGroupAddon>
                        <MaskedMoneyInput
                          name="taxa_servicoVlr"
                          value={this.state.taxa_servicoVlr}
                          placeholder="R$ 0,00"
                          disabled={true} />
                      </InputGroup>
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
        <CardFooter>
          <b>Total</b>
          <b className="pull-right">{this.moneyFormat(vlrTotal)}</b>
        </CardFooter>
      </Card>
    )
  }
}

export default DetalheMesaResumo;