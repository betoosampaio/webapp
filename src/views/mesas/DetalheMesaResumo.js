import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Button, Row, Col, ListGroup,
  ListGroupItem, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import MaskedNumberInput from '../../components/MaskedNumberInput';
import serverRequest from '../../utils/serverRequest';

class DetalheMesaResumo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msgDesconto: '',
      msgValor: '',
      servicoPorcentagem: '',
      descontoPorcentagem: '',
      taxa_servico: '',
      desconto: '',
      txServicoVisivel: false,
      descontoVisivel: false,
    };
  }

  componentDidUpdate() {
    if (this.props.vlrTxServico !== this.state.propsTxServico) {
      let porcentagem = this.props.vlrTxServico / this.props.vlrProdutos * 100;
      this.setState({
        propsTxServico: this.props.vlrTxServico,
        taxa_servico: this.props.vlrTxServico.toFixed(2).replace('.', ','),
        servicoPorcentagem: porcentagem.toFixed(0)
      });
    }
    if (this.props.vlrDesconto !== this.state.propsDesconto) {
      let porcentagem = this.props.vlrDesconto / this.props.vlrProdutos * 100;
      this.setState({
        propsDesconto: this.props.vlrDesconto,
        desconto: this.props.vlrDesconto.toFixed(2).replace('.', ','),
        descontoPorcentagem: porcentagem.toFixed(0)
      });
    }
  }

  changeInputDesconto = (event) => {
    if (event.target.name === "desconto") {

      let evento = event.target.value.replace(',', '');
      let eventoDesconto = event.target.value.replace(',', '.');

      if (eventoDesconto > this.props.vlrTotal) {
        this.setState({ msgValor: true });
      }
      else {
        this.setState({ msgValor: false });
        let porcentagem = evento * 100 / this.props.vlrProdutos / 100;

        this.setState({ desconto: event.target.value, descontoPorcentagem: porcentagem.toFixed(0) });
      }
    } else {

      let evento = event.target.value;

      if (evento > 100) {
        this.setState({ msgDesconto: true });
      }
      else {
        this.setState({ msgDesconto: false });
        let valor = (evento * this.props.vlrProdutos) / 100;

        this.setState({ descontoPorcentagem: event.target.value, desconto: valor.toFixed(2).replace('.', ',') });
      }
    }

  }

  changeInputServico = (event) => {
    if (event.target.name === "taxa_servico") {

      let evento = event.target.value.replace(',', '');
      let eventoDesconto = event.target.value.replace(',', '.');

      if (eventoDesconto > this.props.vlrTotal) {
        this.setState({ msgValor: true });
      }
      else {
        this.setState({ msgValor: false });
        let porcentagem = evento * 100 / this.props.vlrProdutos / 100;

        this.setState({ taxa_servico: event.target.value, servicoPorcentagem: porcentagem.toFixed(0) });
      }
    } else {

      let evento = event.target.value;

      if (evento > 100) {
        this.setState({ msgDesconto: true });
      }
      else {
        this.setState({ msgValor: false });
        let valor = (evento * this.props.vlrProdutos) / 100;

        this.setState({ servicoPorcentagem: event.target.value, taxa_servico: valor.toFixed(2).replace('.', ',') });
      }
    }

  }

  editarDesconto = async () => {
    let obj = {
      desconto: parseFloat(this.state.desconto.replace('.', '').replace(',', '.')),
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
      taxa_servico: parseFloat(this.state.taxa_servico.replace('.', '').replace(',', '.')),
      id_mesa: this.props.id_mesa,
    }
    let dados = await serverRequest.request('/mesa/editarTaxaServico', obj);
    if (dados) {
      this.setState({ txServicoVisivel: false });
      this.props.atualizou();
    }
  }

  moneyFormat = (valor) => {
    if (valor)
      return `R$ ${valor.toFixed(2)}`;
    else
      return valor;
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
                      {this.state.msgValor === true &&

                        <span style={{ color: "Red" }}>Não é o valor total</span>

                      }
                    </Col>
                    <Col xs="5">
                      <InputGroup>
                        <InputGroupAddon addonType="append">
                          <InputGroupText>%</InputGroupText>
                        </InputGroupAddon>

                        <MaskedNumberInput
                          name="servicoPorcentagem"
                          value={this.state.servicoPorcentagem}
                          onChange={this.changeInputServico}
                          placeholder="% Serviço"
                          maxlength="3"

                        />

                      </InputGroup>
                      {this.state.msgDesconto === true &&

                        <span style={{ color: "Red" }}>Maximo 100%</span>

                      }
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
                    {this.state.msgValor === true &&

                      <span style={{ color: "Red" }}>Não é o valor total</span>

                    }
                  </Col>
                  <Col xs="5">
                    <InputGroup>
                      <InputGroupAddon addonType="append">
                        <InputGroupText>%</InputGroupText>
                      </InputGroupAddon>
                      <MaskedNumberInput
                        name="descontoPorcentagem"
                        value={this.state.descontoPorcentagem}
                        onChange={this.changeInputDesconto}
                        placeholder="% Desconto"
                        maxlength="3"
                        id="informativoCodigo"
                      />

                    </InputGroup>

                    {this.state.msgDesconto === true &&

                      <span style={{ color: "Red" }}>Maximo 100%</span>

                    }

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