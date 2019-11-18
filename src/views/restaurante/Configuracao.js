import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Button, Row, Col, ListGroup,
  ListGroupItem, InputGroup, InputGroupAddon, InputGroupText, Input
} from 'reactstrap';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import serverRequest from '../../utils/serverRequest';

class Configuracao extends Component {

  constructor(props) {
    super(props);
    this.state = {
   
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

  changeInputDesconto = (event) => {
    this.setState({ desconto: event.target.value });
  }

  changeInputServico = (event) => {
    let taxa_servico = event.target.value.replace('.', '').replace(',', '.');
    let valor = taxa_servico / 100 * (this.props.vlrProdutos);
    this.setState({ taxa_servico: event.target.value, taxa_servicoVlr: valor });
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
    const { vlrTxServico} = this.props;
    return (
      <Card>
        <CardHeader><i className='icon-settings'></i> <b>Configurações do restaurante:</b>
              </CardHeader>
        <CardBody>
          <ListGroup>
           
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
                          maxLength="6" />
                      </InputGroup>
                    </Col>
                    <Button
                    className="success"
                    onClick={() => this.salvarTaxaPadrao(this.state.taxa_servicoVlr)}
                    >
                      
                    </Button>
                  </Row>
                  : null
              }
            </ListGroupItem>
          
          </ListGroup>
        </CardBody>
       
      </Card>
    )
  }
}

export default Configuracao;