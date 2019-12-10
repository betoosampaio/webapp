import React, { Component } from 'react';
import serverRequest from '../../utils/serverRequest';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import SelectPerfil from '../../components/SelectPerfil'

class Permissao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaPaginas: [],
      listaMetodos: [],
    };
  }

  componentDidMount() {
    this.obterLista(this.props.id_perfil);
  }

  obterLista = async (id_perfil) => {
    if (id_perfil <= 1)
      return false;

    let dados;
    dados = await serverRequest.request('/permissao/listarPermissaoPaginas', { id_perfil: id_perfil });
    if (dados) {
      this.setState({ listaPaginas: dados });
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

  editarPermissaoPagina = async (item, permissao) => {
    if (permissao) {
      await serverRequest.request('/permissao/incluirPermissaoPagina', {
        id_perfil: this.props.id_perfil,
        id_pagina: item.id_pagina
      });
    }
    else {
      await serverRequest.request('/permissao/removerPermissaoPagina', {
        id_perfil: this.props.id_perfil,
        id_pagina: item.id_pagina
      });
    }
    item.permissao = permissao;
    this.setState({ listaPaginas: this.state.listaPaginas });
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

  render() {
    return (
      <div>       
        {this.props.id_perfil >= 1 &&
          <Row>
            <Col sm={6}>
              <Card>
                <CardHeader>Páginas</CardHeader>
                <CardBody>
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
