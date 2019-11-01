import React, { Component } from 'react';
import MultipleSelect from './MultipleSelect';
import serverRequest from '../utils/serverRequest';

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
    return (
      <MultipleSelect id="select-produto" options={{ filter: true, single: true }} {...this.props}>
        <option value="">Selecione</option>
        {
          this.state.lista.map(obj => {
            return (
              <option key={obj.codigo_produto} value={obj.codigo_produto}>{`${obj.codigo_produto} - ${obj.nome_produto}`}</option>
            )
          })
        }
      </MultipleSelect>
    )
  }
}

export default SelectProduto;