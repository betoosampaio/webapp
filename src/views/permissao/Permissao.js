import React, { Component } from 'react';
import serverRequest from '../../utils/serverRequest';
import { Row, Col } from 'reactstrap';
import SelectPerfil from '../../components/SelectPerfil'

class Permissao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_perfil: "",
      listaPaginas: [],
      listaMetodos: [],
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    if (this.state.id_perfil <= 1)
      return false;

    let dados;
    dados = await serverRequest.request('/permissao/listarPermissaoPaginas', { id_perfil: this.state.id_perfil });
    if (dados) {
      this.setState({ listaPaginas: dados });
    }
    dados = await serverRequest.request('/permissao/listarPermissaoMetodos', { id_perfil: this.state.id_perfil });
    if (dados) {
      // agrupa cada funcionalidade em uma lista
      let funcionalidades = [...new Set(dados.map(m => m.funcionalidade))];
      let grouped = []
      funcionalidades.forEach(f => {
        grouped.push({ funcionalidade: f, metodos: dados.filter(m => m.funcionalidade === f) })
      });
      this.setState({ listaMetodos: grouped });
    }
  }

  editarPermissaoPagina = async (item, permissao) => {
    if (permissao) {
      await serverRequest.request('/permissao/incluirPermissaoPagina', {
        id_perfil: this.state.id_perfil,
        id_pagina: item.id_pagina
      });
    }
    else {
      await serverRequest.request('/permissao/removerPermissaoPagina', {
        id_perfil: this.state.id_perfil,
        id_pagina: item.id_pagina
      });
    }
    item.permissao = permissao;
    this.setState({ listaPaginas: this.state.listaPaginas });
  }

  editarPermissaoMetodo = async (item, permissao) => {
    if (permissao) {
      await serverRequest.request('/permissao/incluirPermissaoMetodo', {
        id_perfil: this.state.id_perfil,
        id_metodo: item.id_metodo
      });
    }
    else {
      await serverRequest.request('/permissao/removerPermissaoMetodo', {
        id_perfil: this.state.id_perfil,
        id_metodo: item.id_metodo
      });
    }
    item.permissao = permissao;
    this.setState({ listaMetodos: this.state.listaMetodos });
  }

  changePerfil = (event) => {
    this.setState({ id_perfil: event.target.value }, () => {
      this.obterLista();
    });
  }

  render() {
    return (
      <div>
        <Row className="mb-4">
          <Col sm={6}>
            <label className="mr-2">Selecione o perfil:</label>
            <SelectPerfil
              value={this.state.id_perfil}
              onChange={this.changePerfil}
              ignoraradm="true">
            </SelectPerfil>
          </Col>
        </Row>
        {this.state.id_perfil >= 1 &&
          <Row>
            <Col xs={6}>
              <h4>Páginas</h4>
              {
                this.state.listaPaginas.map(obj => {
                  return (
                    <div key={obj.id_pagina}>
                      <label className="p-1">
                        <input
                          type="checkbox"
                          checked={obj.permissao ? true : false}
                          onChange={(event) => { this.editarPermissaoPagina(obj, event.target.checked) }} />
                        <i className={obj.icone + " mx-2"} />
                        <span>{obj.ds_pagina}</span>
                      </label>
                    </div>
                  )
                })
              }
            </Col>
            <Col xs={6}>
              <h4>Funcionalidades</h4>
              {
                this.state.listaMetodos.map(f => {
                  return (
                    <div className="my-4" key={f.funcionalidade}>
                      <h6 className="mb-3">{f.funcionalidade}</h6>
                      {
                        f.metodos.map(obj => {
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
                    </div>
                  )
                })
              }
            </Col>
          </Row>
        }
      </div>
    );
  }
}

export default Permissao;
