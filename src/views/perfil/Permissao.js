import React, { Component } from 'react';
import serverRequest from '../../utils/serverRequest';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

class Permissao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaPaginas: [],
      listaPaginasTree: [],
      listaMetodos: [],
    };
  }

  componentDidMount() {
    this.obterLista(this.props.id_perfil);
  }

  obterLista = async (id_perfil) => {
    let dados
    dados = await serverRequest.request('/permissao/listarPermissaoPaginas', { id_perfil: id_perfil });
    if (dados) {
      this.popularListaPaginaTree(dados);
    }
    dados = await serverRequest.request('/permissao/listarPermissaoMetodos', { id_perfil: id_perfil });
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

  popularListaPaginaTree = (dados) => {
    if (!dados) dados = this.state.listaPaginas;
    let tree = this.getNestedChildren(dados, null);
    this.setState({ listaPaginasTree: tree, listaPaginas: dados });
  }

  getNestedChildren = (arr, id_pai) => {
    var out = []
    for (var i in arr) {
      if (arr[i].id_pai === id_pai) {
        var children = this.getNestedChildren(arr, arr[i].id_pagina)

        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i])
      }
    }
    return out
  }

  editarPermissaoPagina = async (item, permissao) => {

    let parents = permissao ? this.getParents(item, []) : [];
    let children = this.getChildren(item);
    let lista = [item, ...children, ...parents];

    let url = permissao ? "/permissao/incluirPermissaoPagina" : "/permissao/removerPermissaoPagina";

    let listaPaginas = this.state.listaPaginas;

    for (let i = 0; i < lista.length; i++) {
      let n = lista[i];
      await serverRequest.request(url, {
        id_perfil: this.props.id_perfil,
        id_pagina: n.id_pagina
      });
      let p = listaPaginas.find(p => p.id_pagina === n.id_pagina);
      p.permissao = permissao;
    }

    this.popularListaPaginaTree();
  }

  getChildren = (node) => {
    let children = Object.assign([], node.children);
    if (node.children) {
      node.children.forEach(c => {
        children.push(...this.getChildren(c));
      })
    }
    return children;
  }

  getParents = (node, parents) => {
    if (node.id_pai) {
      let parent = this.state.listaPaginas.find(p => p.id_pagina === node.id_pai);
      parents.push(parent);
      this.getParents(parent, parents);
    }
    return parents;
  }

  editarPermissaoMetodo = async (item, permissao) => {
    if (permissao) {
      await serverRequest.request('/permissao/incluirPermissaoMetodo', {
        id_perfil: this.props.id_perfil,
        id_metodo: item.id_metodo
      });
    }
    else {
      await serverRequest.request('/permissao/removerPermissaoMetodo', {
        id_perfil: this.props.id_perfil,
        id_metodo: item.id_metodo
      });
    }
    item.permissao = permissao;
    this.setState({ listaMetodos: this.state.listaMetodos });
  }

  renderizarCheckPaginaRecursivo = (obj) => {
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
        <div className="ml-4">
          {obj.children && obj.children.map(c => {
            return this.renderizarCheckPaginaRecursivo(c);
          })}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.id_perfil >= 1 &&
          <Row>
            <Col sm={6}>
              <Card>
                <CardHeader>Páginas do Sistema</CardHeader>
                <CardBody>
                  {
                    this.state.listaPaginasTree.map(obj => {
                      return this.renderizarCheckPaginaRecursivo(obj);
                    })
                  }
                </CardBody>
              </Card>
            </Col>
            <Col sm={6}>
              <Card>
                <CardHeader>Funcionalidades</CardHeader>
                <CardBody>
                  {
                    this.state.listaMetodos.map(f => {
                      return (
                        <div className="mb-5" key={f.funcionalidade}>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        }
      </div>
    );
  }
}

export default Permissao;
