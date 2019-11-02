import React, { Component } from 'react';
import MultipleSelect from './MultipleSelect';
import serverRequest from '../utils/serverRequest';
import ReactDOMServer from 'react-dom/server';
import Foto from './Foto';

class SelectProduto extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lista: [],
      value: [],
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

    return (
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
    )
  }
}

export default SelectProduto;