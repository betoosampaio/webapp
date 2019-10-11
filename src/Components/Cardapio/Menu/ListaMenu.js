import React from 'react';
import Select from 'react-select';
import MaskedInput from 'react-text-mask'
import { Link } from 'react-router-dom'
import { Table, Modal, Button } from 'react-bootstrap'
import styles from './StyleMenu.css'


const path = process.env.REACT_APP_SRV_PATH;
const pathWeb = process.env.REACT_APP_WEB_PATH;


class ListaMenu extends React.Component {

  state = {
    formCadastrarMenu: false,
    formEditarMenu: false,
    listaMenu: [],
    formulario: {
      ds_menu: '',
      id_restaurante: '',

    }
  }


  componentDidMount() {
    this.mostrarConteudo();
  }

  updateMenu = async (event) => {

    let formulario = this.state.formulario;


    try {
      let res = await fetch(path + '/menu/editar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(this.state.formulario)
      });
      alert('MENU EDITADO COM SUCESSO!');
      window.location.href = pathWeb + '/menu/lista';
    } catch (error) {
      alert('ERRO AO EDITAR O MENU');
      console.log(error);
    }

  }

  selecionarMenu = async (id_menu) => {

    try {
      let res = await fetch(path + '/menu/obter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ "id_menu": id_menu })
      });
      let data = await res.json();

      let obj = data[0];
      this.setState({ formulario: obj, formEditarMenu: true });


    } catch (error) {

      console.log(error);
    }
  }


  removerMenu = async (id_menu) => {

    try {
      let res = await fetch(path + '/menu/remover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ "id_menu": id_menu })
      });
      alert('Removido com sucesso !');
      this.mostrarConteudo();
    } catch (error) {
      alert('ERRO AO REMOVER');
      console.log(error);
    }

  }


  mostrarConteudo = async function () {
    let res = await fetch(path + '/menu/listar', {
      method: 'POST',
      headers: {
        'token': localStorage.getItem('token')
      },
    });


    this.setState({ listaMenu: await res.json() });

  }


  cadastrarMenu = async (event) => {
    console.log(this.state.formulario);

    let formulario = this.state.formulario;
    // ajustando os valores dos Select


    try {
      let res = await fetch(path + '/menu/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(this.state.formulario)
      });
      alert('MENU CADASTRADO COM SUCESSO!');
      window.location.href = pathWeb + '/Menu/Lista';
    } catch (error) {
      alert('ERRO AO CADASTRAR O MENU');
      console.log(error);
    }

  }


  formChange = (event) => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[event.target.name] = event.target.value;
    this.setState({ formulario: formNewState });
  }

  formChangeSelect = name => value => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[name] = value;
    this.setState({ formulario: formNewState });
  }


  render() {
    return (
      <div>


        <button class="btn btn-primary" type='button' onClick={() => this.setState({ formCadastrarMenu: true })}>Novo Menu</button>


        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.formCadastrarMenu}
          onHide={() => { this.setState({ formCadastrarMenu: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Cadastrar novo Menu
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form id='formCadastrarMenu'>

              <h2>Registrar Menu</h2>


              <input
                type='text'
                placeholder='Nome do Menu'
                name='ds_menu'
                value={this.state.formulario.ds_menu}
                onChange={this.formChange}

              />


              <p></p>




            </form>

          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-primary" type='button' onClick={this.cadastrarMenu}>Cadastrar Menu</button>
          </Modal.Footer>
        </Modal>


        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.formEditarMenu}
          onHide={() => { this.setState({ formEditarMenu: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Editando o Menu
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form id='formEditarMenu'>
              <h1>Editar o Menu</h1>

              <p></p>


              <input
                type='text'
                name='ds_menu'
                value={this.state.formulario.ds_menu}
                onChange={this.formChange}
              />
              <p></p>


              <input
                type="checkbox"
                name='ativo'
                checked={this.state.formulario.ativo}
                onChange={this.formChangeCheck} />Menu Ativo

                    <p></p>



            </form>

          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-primary" onClick={this.updateMenu} type='button'>Editar Menu</button>
          </Modal.Footer>
        </Modal>


        <p></p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome do Prato</th>
              <th>Status do Menu</th>
              <th>Excluir</th>
              <th>Editar</th>
            </tr>

          </thead>

          <tbody>

            {

              this.state.listaMenu.map((obj) => {
                return (

                  <tr>


                    <td>{obj.ds_menu}</td>
                    <td>{obj.ativo ? 'Menu Ativo' : 'Menu Desativado'}</td>

                    <td><button type='button' class="btn btn-primary" onClick={() => this.removerMenu(obj.id_menu)}>Excluir</button></td>


                    <td><button type='button' class="btn btn-primary" onClick={() => this.selecionarMenu(obj.id_menu)}>Editar</button></td>




                  </tr>


                );
              })
            }
          </tbody>
        </Table>

      </div>
    )
  }
}

export default ListaMenu;
