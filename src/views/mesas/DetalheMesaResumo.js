import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Button, Input, Row, Col, ListGroup,
  ListGroupItem, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import Maskedpercentage from '../../components/Maskedpercentage';
import serverRequest from '../../utils/serverRequest';

class DetalheMesaResumo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      servicoPorcentagem: '',
      descontoPorcentagem: '',
      taxa_servico: '',
      desconto: '',
      txServicoVisivel: false,
      descontoVisivel: false,
    };
  }

  changeInputDesconto = (event) => {
    if (event.target.name === "desconto") {

      let evento = event.target.value.replace(',', '');

      let porcentagem = evento * 100 / this.props.vlrProdutos / 100;

      this.setState({ desconto: event.target.value, descontoPorcentagem: porcentagem });

    } else {

      let valor = (event.target.value * this.props.vlrProdutos) / 100;

      this.setState({ descontoPorcentagem: event.target.value, desconto: valor });
    }

  }

  changeInputServico = (event) => {
    if (event.target.name === "taxa_servico") {

      let evento = event.target.value.replace(',', '');
      
      let porcentagem = evento * 100 / this.props.vlrProdutos /100 ;

      this.setState({ taxa_servico: event.target.value, servicoPorcentagem: porcentagem });

    } else {
      let valor = (event.target.value * this.props.vlrProdutos) / 100;

      this.setState({ servicoPorcentagem: event.target.value, taxa_servico: valor });
    }

  }

  editarDesconto = async (id_mesa, desconto) => {

    let obj = {
      desconto: parseInt(this.state.desconto),
      id_mesa: this.props.id_mesa,
    }
    console.log(obj);
    let dados = await serverRequest.request('/mesa/editarDesconto', obj);
    if (dados) {
      window.parent.location.reload();
    }
  }

  editarTxServico = async (id_mesa, taxa_servico) => {

    let obj = {
      taxa_servico: parseInt(this.state.taxa_servico),
      id_mesa: this.props.id_mesa,
    }
    console.log(obj);
    let dados = await serverRequest.request('/mesa/editarTaxaServico', obj);
    if (dados) {
      window.parent.location.reload();
    }
  }

  moneyFormat = (valor) => {
    if (valor)
      return `R$ ${valor.toFixed(2)}`;
    else
      return valor;
  }

  render() {
    const { novoProduto, vlrProdutos, vlrTxServico, vlrDesconto, vlrTotal, id_mesa } = this.props;
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
                          <InputGroupText>R$</InputGroupText>
                        </InputGroupAddon>
                        <MaskedMoneyInput
                          name="taxa_servico"
                          value={this.state.taxa_servico}
                          onChange={this.changeInputServico}
                          placeholder="Tx Serviço"
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="5">
                      <InputGroup>
                        <InputGroupAddon addonType="append">
                          <InputGroupText>%</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="servicoPorcentagem"
                          value={this.state.servicoPorcentagem}
                          onChange={this.changeInputServico}
                          placeholder="% Serviço"
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="2">
                      <Button onClick={() => this.editarTxServico(this.state._id, this.state.taxa_servico)}>OK</Button>
                    </Col>
                  </Row>
                  : null
              }
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
                        <InputGroupText>R$</InputGroupText>
                      </InputGroupAddon>
                      <MaskedMoneyInput
                        name="desconto"
                        value={this.state.desconto}
                        onChange={this.changeInputDesconto}
                        placeholder="Desconto"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="5">
                    <InputGroup>
                      <InputGroupAddon addonType="append">
                        <InputGroupText>%</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="descontoPorcentagem"
                        value={this.state.descontoPorcentagem}
                        onChange={this.changeInputDesconto}
                        placeholder="% Desconto"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="2">
                    <Button onClick={() => this.editarDesconto(this.state._id, this.state.desconto)}>OK</Button>
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