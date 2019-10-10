import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom'


const path = process.env.REACT_APP_SRV_PATH;
const pathWeb = process.env.REACT_APP_WEB_PATH;


class ListaMenu extends React.Component {

  state = {
    listaMenu: [],
    formulario: {
      ds_menu: '',
      id_restaurante:'',
    }
  }


  componentDidMount() {
    this.mostrarConteudo();

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


        <Popup
          trigger={<button className="button"> Cadastrar novo Menu </button>}
          modal
          closeOnDocumentClick
        >

          <form>

            <h2>Registrar Menu</h2>


            <input
              type='text'
              placeholder='Nome do Menu'
              name='ds_menu'
              value={this.state.formulario.ds_menu}
              onChange={this.formChange}

            />


            <p></p>


            <button class="btn btn-primary" type='button' onClick={this.cadastrarMenu}>Cadastrar Menu</button>
            <p></p>
            <a href="/Menu/Lista">Voltar</a>

            <p></p>



          </form>


        </Popup>


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

                    <td><button type='button' onClick={() => this.removerMenu(obj.id_menu)}>Excluir </button></td>

                    <td><Link to={{ pathname: '/Menu/Editar', id_menu: obj.id_menu }}>Editar</Link></td>


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
