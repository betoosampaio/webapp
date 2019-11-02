import React, { Component } from 'react';
import MultipleSelect from './MultipleSelect';
import serverRequest from '../utils/serverRequest';
import ReactDOMServer from 'react-dom/server';
import Foto from './Foto';
import { FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Table } from 'reactstrap';

class SelectProduto extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lista: [],
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

  render() {
    const options = {
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

    let produtoSelecionado = this.state.lista.filter(p => String(p.id_produto) === this.props.value[0])[0];

    return (
      <div>
        <FormGroup>
          <Label>Produto:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fa fa-list-ul"></i></InputGroupText>
            </InputGroupAddon>
            <MultipleSelect id="select-produto" options={options} {...this.props}>
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
        {
          produtoSelecionado
            ?
            <Table responsive className="table-outline mb-0 d-none d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th>Imagem</th>
                  <th>Código</th>
                  <th>Produto</th>
                  <th>Preço Un</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Foto src={produtoSelecionado.imagem} height="50" width="50"></Foto></td>
                  <td>{produtoSelecionado.codigo_produto}</td>
                  <td>{produtoSelecionado.nome_produto}</td>
                  <td>R$ {parseFloat(produtoSelecionado.preco).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
            : null
        }
      </div>
    )
  }
}

export default SelectProduto;