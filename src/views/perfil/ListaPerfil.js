import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';


const ListaPerfil = (props) => {

  constructor(props) {
    super(props);

    this.state = {
      lista: [],
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async function () {
    let dados = await serverRequest.request('/meuperfil/listar');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  render() {
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Dados Pessoais</th>
            <th>Dados do Restaurante</th>
            <th>Dados do Bancários</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.lista.map((obj) => {
              return (
                <tr key={obj.nome_administrador}>
                  <td>{obj.nome_administrador}></td>
                  <td>{obj.cpf_administrador}></td>
                  <td>{obj.email}></td>
                  <td>{obj.celular}></td>
                  <td>
                    <Link to={{ pathname: 'gerenciar/restaurante/editar/${obj.nome_administrador}' }}> </Link>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  }
}

export default ListaPerfil;
