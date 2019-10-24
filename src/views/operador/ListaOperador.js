import React, { Component } from 'react';
import { Table, Button, InputGroup, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'

class ListaOperador extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      lista: [],
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    let dados = await serverRequest.request('/operador/listar');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  remover = async (id) => {
    let dados = await serverRequest.request('/operador/remover', { "id_operador": id });
    if (dados) {
      this.obterLista();
      this.setState({ showDelete: false });
    }
  }

  render() {
    return (
      <Table striped bordered hover responsive>

        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Perfil</th>
            <th>Login</th>
            <th>Status</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.lista.map((obj) => {

              if (this.props.showVisivel === 1) {

                return (
                  <tr key={obj.id_operador}>
                    <td>{obj.id_operador}</td>
                    <td>{obj.nome_operador}</td>
                    <td>{obj.tipo_perfil}</td>
                    <td>{obj.login_operador}</td>

                    <td>{obj.ativo ? 'Operador Ativo' : 'Operador Desativado'}</td>
                    <td>
                      <Link to={{ pathname: `/operador/editar/${obj.id_operador}` }}>
                        <Button color="secondary" size="sm">
                          <i className="icon-note"></i>
                        </Button>
                      </Link>
                    </td>

                    <td>

                      <Modal
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showDelete}
                        onHide={() => { this.setState({ showDelete: false }) }}
                        backdrop='static'
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Confirmação</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <p>Você tem certeza que deseja excluir ?</p>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button variant="secondary" color="danger" onClick={() => this.setState({ showDelete: false })}>Não</Button>
                          <Button variant="primary" color="success" onClick={() => this.remover(obj.id_operador)}>Sim</Button>
                        </Modal.Footer>
                      </Modal>

                      <Button onClick={() => this.setState({ showDelete: true })} color="danger" size="sm">
                        <i className="icon-close"></i>
                      </Button>
                    </td>
                  </tr>
                );

              } if (obj.ativo === 1) {

                return (
                  <tr key={obj.id_operador}>
                    <td>{obj.id_operador}</td>
                    <td>{obj.nome_operador}</td>
                    <td>{obj.tipo_perfil}</td>
                    <td>{obj.login_operador}</td>

                    <td>{obj.ativo ? 'Operador Ativo' : 'Operador Desativado'}</td>
                    <td>
                      <Link to={{ pathname: `/operador/editar/${obj.id_operador}` }}>
                        <Button color="secondary" size="sm">
                          <i className="icon-note"></i>
                        </Button>
                      </Link>
                    </td>

                    <td>

                      <Modal
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showDelete}
                        onHide={() => { this.setState({ showDelete: false }) }}
                        backdrop='static'
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Confirmação</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <p>Você tem certeza que deseja excluir ?</p>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button variant="secondary" color="danger" onClick={() => this.setState({ showDelete: false })}>Não</Button>
                          <Button variant="primary" color="success" onClick={() => this.remover(obj.id_operador)}>Sim</Button>
                        </Modal.Footer>
                      </Modal>

                      <Button onClick={() => this.setState({ showDelete: true })} color="danger" size="sm">
                        <i className="icon-close"></i>
                      </Button>
                    </td>
                  </tr>
                );
              }
            })
          }
        </tbody>
      </Table>
    );
  }
}

export default ListaOperador;
