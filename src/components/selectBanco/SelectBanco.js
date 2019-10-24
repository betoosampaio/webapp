import React, { Component } from 'react';
import MultipleSelect from '../multipleSelect/MultipleSelect';
import serverRequest from '../../utils/serverRequest';

class SelectBanco extends Component {

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
    let dados = await serverRequest.request('/obterBancos');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  render() {
    return (
      <MultipleSelect id="select-banco" options={{ filter: true, single: true }} {...this.props}>
        <option value="">Selecione</option>
        {
          this.state.lista.map(obj => {
            return (
              <option key={obj.codigo} value={obj.codigo}>{`${obj.codigo} - ${obj.nome}`}</option>
            )
          })
        }
      </MultipleSelect>
    )
  }
}

export default SelectBanco;