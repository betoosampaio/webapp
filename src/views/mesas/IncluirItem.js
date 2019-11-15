import React, { Component } from 'react';
import { Button, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Table } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import MaskedNumberInput from '../../components/MaskedNumberInput';
import MultipleSelect from '../../components/MultipleSelect';
import ReactDOMServer from 'react-dom/server';
import Foto from '../../components/Foto';

class IncluirItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      selecionados: [],
      id_produto: "",
    };
  }

  componentDidMount() {
    this.obterDados();
  }

  obterDados = async () => {
    let dados = await serverRequest.request('/produto/listarAtivos');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  changeInput = (event) => {
    let id_produto = event.target.value[0];
    if (!id_produto) return;

    let selecionado = this.state.lista.filter(p => (String(p.id_produto) === String(id_produto)))[0];
    selecionado.quantidade = 1;
    selecionado.id = this.state.selecionados.reduce((prev, cur) => (prev.id > cur.id) ? prev.id : cur.id, 0) + 1;

    this.setState({
      selecionados: [...this.state.selecionados, selecionado],
      id_produto: "",
    });
  }

  incluirItem = async (event) => {
    event.preventDefault();

    if (this.state.selecionados.length > 0) {
      let obj = {
        id_mesa: this.props.id_mesa,
        produtos: this.state.selecionados,
      }

      let dados = await serverRequest.request('/mesa/item/incluir', obj);
      if (dados) {
        this.setState({ id_produto: "", selecionados: [] });
        this.props.itemincluso();
      }
    }
  }

  decrementar(id) {
    let selecionados = Object.assign([], this.state.selecionados);
    let selecionado = this.state.selecionados.find(p => p.id === id);
    if (parseInt(selecionado.quantidade) > 1) {
      selecionado.quantidade = parseInt(selecionado.quantidade) - 1;
      this.setState({ selecionados: selecionados })
    }
  }

  incrementar(id) {
    let selecionados = Object.assign([], this.state.selecionados);
    let selecionado = this.state.selecionados.find(p => p.id === id);
    selecionado.quantidade = parseInt(selecionado.quantidade) + 1;
    this.setState({ selecionados: selecionados })
  }

  remover(id){
    let selecionados = Object.assign([], this.state.selecionados);
    selecionados = selecionados.filter(p => p.id !== id);
    this.setState({ selecionados: selecionados })
  }

  onHide = () => {
    this.setState({ id_produto: "", selecionados: [] });
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
                  onChange={this.changeInput}>
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
            <Table striped bordered hover responsive>
              <thead className="thead-light">
                <tr>
                  <th>Imagem</th>
                  <th>Código</th>
                  <th>Produto</th>
                  <th>Preço Unitário</th>
                  <th>Preço Total</th>
                  <th>Quantidade</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selecionados.map(obj => {
                  return (
                    <tr key={obj.id}>
                      <td><Foto src={obj.imagem} height="50" width="50"></Foto></td>
                      <td>{obj.codigo_produto}</td>
                      <td>{obj.nome_produto}</td>
                      <td>R$ {parseFloat(obj.preco).toFixed(2)}</td>
                      <td>R$ {(parseFloat(obj.preco) * parseInt(obj.quantidade)).toFixed(2)}</td>
                      <td>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon onClick={() => this.decrementar(obj.id)} addonType="append" >
                              <InputGroupText><i className="fa fa-minus"></i></InputGroupText>
                            </InputGroupAddon>
                            <MaskedNumberInput
                              name="quantidade"
                              placeholder="Quantidade"
                              value={obj.quantidade}
                              disabled={true}
                              width="50px"
                              required />
                            <InputGroupAddon onClick={() => this.incrementar(obj.id)} addonType="append">
                              <InputGroupText><i className="fa fa-plus"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </td>
                      <td>
                        <Button color="danger" size="sm" onClick={() => this.remover(obj.id)} >
                          <i className="icon-close"></i>
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="success">Incluir</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default IncluirItem;
