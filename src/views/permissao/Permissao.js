import React, { Component } from 'react';
import serverRequest from '../../utils/serverRequest';
import { Row, Col } from 'reactstrap';

class Permissao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaPaginas: [],
      listaMetodos: [],
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    let dados;
    dados = await serverRequest.request('/permissao/listarPermissaoPaginas', { id_perfil: 1 });
    if (dados) {
      this.setState({ listaPaginas: dados });
    }
    dados = await serverRequest.request('/permissao/listarPermissaoMetodos', { id_perfil: 1 });
    if (dados) {
      this.setState({ listaMetodos: dados });
    }
  }

  editarPermissaoPagina = async (item, permissao) => {
    if (permissao) {
      await serverRequest.request('/permissao/incluirPermissaoPagina', {
        id_perfil: 1,
        id_pagina: item.id_pagina
      });
    }
    else {
      await serverRequest.request('/permissao/removerPermissaoPagina', {
        id_perfil: 1,
        id_pagina: item.id_pagina
      });
    }
    item.permissao = permissao;
    this.setState({ listaPaginas: this.state.listaPaginas });
  }

  editarPermissaoMetodo = async (item, permissao) => {
    if (permissao) {
      await serverRequest.request('/permissao/incluirPermissaoMetodo', {
        id_perfil: 1,
        id_metodo: item.id_metodo
      });
    }
    else {
      await serverRequest.request('/permissao/removerPermissaoMetodo', {
        id_perfil: 1,
        id_metodo: item.id_metodo
      });
    }
    item.permissao = permissao;
    this.setState({ listaMetodos: this.state.listaMetodos });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={6}>
            <h4 onClick={() => { this.editarPermissaoPagina({ id_pagina: 1 }, true) }}>Páginas</h4>
            {
              this.state.listaPaginas.map(obj => {
                return (
                  <div key={obj.id_pagina}>
                    <label>
                      <input
                        type="checkbox"
                        checked={obj.permissao ? true : false}
                        onChange={(event) => { this.editarPermissaoPagina(obj, event.target.checked) }} />
                      <span className="ml-1">{obj.ds_pagina}</span>
                    </label>
                  </div>
                )
              })
            }
          </Col>
          <Col xs={6}>
            <h4>Funcionalidades</h4>
            {
              this.state.listaMetodos.map(obj => {
                return (
                  <div key={obj.id_metodo}>
                    <label>
                      <input
                        type="checkbox"
                        checked={obj.permissao ? true : false}
                        onChange={(event) => { this.editarPermissaoMetodo(obj, event.target.checked) }} />
                      <span className="ml-1">{obj.ds_metodo}</span>
                    </label>
                  </div>
                )
              })
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default Permissao;
