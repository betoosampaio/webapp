import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../utils/serverRequest';

class SelectPerfil extends Component {

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
    let dados = await serverRequest.request('/perfil/listar');
    if (dados) {
      if (this.props.ignoraradm)
        dados = dados.filter(p => p.id_perfil !== 1);
      this.setState({ lista: dados });
    }
  }

  render() {
    return (
      <Input type="select" {...this.props}>
        <option value="">Selecione</option>
        {
          this.state.lista.map(obj => {
            return (
              <option key={obj.id_perfil} value={obj.id_perfil}>{obj.ds_perfil}</option>
            )
          })
        }
      </Input>
    )
  }
}

export default SelectPerfil;