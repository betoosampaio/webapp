import React, { Component } from 'react';
import { Button, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Row, Col, Table } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import MaskedNumberInput from '../../components/MaskedNumberInput';
import MultipleSelect from '../../components/MultipleSelect';
import ReactDOMServer from 'react-dom/server';
import Foto from '../../components/Foto';

class DetalheMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      id_produto: "",
      quantidade: 1,
    };
  }

  componentDidMount() {
    this.obterDados();
  }

  obterDados = async () => {
    let dados = await serverRequest.request('/produto/listar');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  incluirItem = async (event) => {
    event.preventDefault();

    let obj = {
      id_mesa: this.props.id_mesa,
      id_produto: this.state.id_produto[0],
      quantidade: parseInt(this.state.quantidade),
    }

    let dados = await serverRequest.request('/mesa/item/incluir', obj);

    if (dados) {
      this.setState({ id_produto: "", quantidade: 1 });
      this.props.itemincluso();
    }
  }

  decrementar() {
    if (this.state.quantidade > 1) {
      this.setState({ quantidade: parseInt(this.state.quantidade) - 1 })
    }
  }

  incrementar() {
    this.setState({ quantidade: parseInt(this.state.quantidade) + 1 })
  }

  onHide = () => {
    this.setState({ id_produto: "", quantidade: 1 });
    this.props.onHide();
  }

  render() {

    const multipleSelectOptions = {
      filter: true,
      single: true,
      displayValues: true,
      placeholder: "Selecione",
      textTemplate: (el) => {
        if (el[0].value) {
          return ReactDOMServer.renderToStaticMarkup(
            <span>
              <Foto src={el[0].dataset.imagem} height="30" width="30"></Foto>
              <span className="ml-2 text-muted">[{el[0].dataset.codigo}]</span>
              <span className="ml-2 font-weight-bold">{el[0].dataset.nome}</span>
              <div className="pull-right">R$ {parseFloat(el[0].dataset.preco).toFixed(2)}</div>
            </span>
          )
        }
        else
          return el[0].innerHTML;
      },
    }

    let produtoSelecionado = this.state.lista.filter(p => String(p.id_produto) === this.state.id_produto[0])[0];

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        show={this.props.show}
        onHide={this.onHide}>
        <form onSubmit={this.incluirItem}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Adicionar novo item a mesa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} sm={7} md={8} lg={9}>
                <FormGroup>
                  <Label>Produto:</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-list-ul"></i></InputGroupText>
                    </InputGroupAddon>
                    <MultipleSelect
                      id="select-produto"
                      options={multipleSelectOptions}
                      name="id_produto"
                      value={this.state.id_produto}
                      onChange={this.changeInput}
                      required>
                      <option value="">Selecione</option>
                      {
                        this.state.lista.map(obj => {
                          return (
                            <option
                              key={obj.codigo_produto}
                              value={obj.id_produto}
                              data-codigo={obj.codigo_produto}
                              data-preco={obj.preco}
                              data-nome={obj.nome_produto}
                              data-imagem={obj.imagem}>
                              {obj.codigo_produto}{obj.nome_produto}
                            </option>
                          )
                        })
                      }
                    </MultipleSelect>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs={6} sm={5} md={4} lg={3}>
                <FormGroup>
                  <Label>Quantidade:</Label>
                  <InputGroup>
                    <InputGroupAddon onClick={this.decrementar.bind(this)} addonType="append" >
                      <InputGroupText><i className="fa fa-minus"></i></InputGroupText>
                    </InputGroupAddon>
                    <MaskedNumberInput
                      name="quantidade"
                      placeholder="Quantidade"
                      value={this.state.quantidade}
                      onChange={this.changeInput}
                      required />
                    <InputGroupAddon onClick={this.incrementar.bind(this)} addonType="append">
                      <InputGroupText><i className="fa fa-plus"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {
                  produtoSelecionado
                    ?
                    <Table striped bordered hover responsive>
                      <thead className="thead-light">
                        <tr>
                          <th>Imagem</th>
                          <th>Código</th>
                          <th>Produto</th>
                          <th>Preço Unitário</th>
                          <th>Preço Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><Foto src={produtoSelecionado.imagem} height="50" width="50"></Foto></td>
                          <td>{produtoSelecionado.codigo_produto}</td>
                          <td>{produtoSelecionado.nome_produto}</td>
                          <td>R$ {parseFloat(produtoSelecionado.preco).toFixed(2)}</td>
                          <td>R$ {(parseFloat(produtoSelecionado.preco) * parseInt(this.state.quantidade)).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </Table>
                    : null
                }
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="success">Incluir</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default DetalheMesa;
