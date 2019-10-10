import React from 'react';
import Select from 'react-select';
import { Table, Modal, Button } from 'react-bootstrap'
import MaskedInput from 'react-text-mask'




import { Link } from 'react-router-dom'

const path = process.env.REACT_APP_SRV_PATH;
const pathWeb = process.env.REACT_APP_WEB_PATH;

class ListaOperador extends React.Component {

  state = {
    editarAberto: false,
    cadastrarAberto: false,
    perfil: [],
    listaOperador: [],
    formulario: {
      nome_operador: '',
      id_perfil: '',
      login_operador: '',
      senha_operador: '',
      ativo: '',
    },
    formulario_editar: {
      nome_operador: '',
      id_perfil: '',
      login_operador: '',
      senha_operador: '',
      ativo: '',
    },
  };


  componentDidMount() {
    this.obterPerfil();
    this.mostrarConteudo();
  }



  selecionarOperador = async (id_operador) => {

    try {
      let res = await fetch(path + '/operador/obter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ "id_operador": id_operador })
      });
      let data = await res.json();

      let obj = data[0];
      obj.id_perfil = { id_perfil: obj.id_perfil, tipo_perfil: obj.tipo_perfil };
      this.setState({ formulario_editar: obj, editarAberto: true });


    } catch (error) {

      console.log(error);
    }
  }



  removerOperador = async (id_operador) => {

    try {
      let res = await fetch(path + '/operador/remover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ "id_operador": id_operador })
      });
      alert('OPERADOR REMOVIDO COM SUCESSO!');
      this.mostrarConteudo();
    } catch (error) {
      alert('ERRO AO REMOVER');
      console.log(error);
    }

  }


  mostrarConteudo = async function () {
    let res = await fetch(path + '/operador/listar', {
      method: 'POST',
      headers: {
        'token': localStorage.getItem('token')
      },
    });


    this.setState({ listaOperador: await res.json() });

  }



  updateOperador = async (event) => {

    let formulario_editar = this.state.formulario_editar;
    formulario_editar.id_perfil = formulario_editar.id_perfil.id_perfil;

    try {
      let res = await fetch(path + '/operador/editar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(this.state.formulario_editar)
      });
      alert('OPERADOR EDITADO COM SUCESSO!');
      window.location.href = pathWeb + '/operador/lista'
    } catch (error) {
      alert('ERRO AO EDITAR');
      console.log(error);
    }

  }




  obterPerfil = async function () {
    let res = await fetch(path + '/perfil/listar', {
      method: 'POST',
      headers: {
        'token': localStorage.getItem('token')
      },
    });
    this.setState({ id_perfil: await res.json() });
  }


  cadastrarOperador = async (event) => {
    console.log(this.state.formulario);

    let formulario = this.state.formulario;
    formulario.id_perfil = formulario.id_perfil.id_perfil;
    try {
      let res = await fetch(path + '/operador/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(this.state.formulario)
      });
      alert('OPERADOR CADASTRADO COM SUCESSO!');
      window.location.href = pathWeb + '/Operador/Lista'
    } catch (error) {
      alert('ERRO AO CADASTRAR OPERADOR');
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

  formChangeCheck = (event) => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[event.target.name] = event.target.checked ? 1 : 0;
    this.setState({ formulario: formNewState });
  }

  formChangeEditar = (event) => {
    let formNewState = Object.assign({}, this.state.formulario_editar);
    formNewState[event.target.name] = event.target.value;
    this.setState({ formulario_editar: formNewState });
  }

  formChangeSelectEditar = name => value => {
    let formNewState = Object.assign({}, this.state.formulario_editar);
    formNewState[name] = value;
    this.setState({ formulario_editar: formNewState });
  }









  render() {
    return (

      <div>




        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.editarAberto}
          onHide={() => { this.setState({ editarAberto: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Editar Operador
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <form>
             

              <p></p>
              <label>NomeOperador</label>
              <p></p>

              <input
                type='text'
                name='nome_operador'
                value={this.state.formulario_editar.nome_operador}
                onChange={this.formChangeEditar}
              />

              <p></p>
              <label>TipoPerfil</label>
              <p></p>

              <Select
                name="id_perfil"
                options={this.state.id_perfil}
                getOptionLabel={option => option.tipo_perfil}
                getOptionValue={option => option.id_perfil}
                value={this.state.formulario_editar.id_perfil}
                onChange={this.formChangeSelectEditar('id_perfil')}
              />

              <p></p>
              <label>LoginOperador</label>
              <p></p>

              <input
                type='text'
                name='login_operador'
                value={this.state.formulario_editar.login_operador}
                onChange={this.formChangeEditar}
              />

              <p></p>

              <input
                type="checkbox"
                name='ativo'
                checked={this.state.formulario_editar.ativo}
                onChange={this.formChangeCheck} /> Ativo

                        <p></p>
              <label>SenhaOperador</label>
              <p></p>

              <input
                type='password'
                name='senha_operador'
                value={this.state.formulario_editar.senha_operador}
                onChange={this.formChange}
              />
              <p></p>
             
              <p></p>
            
            </form>


          </Modal.Body>
          <Modal.Footer>
          <button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>
          </Modal.Footer>
        </Modal>



        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.cadastrarAberto}
          onHide={() => { this.setState({ cadastrarAberto: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Editar Operador
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>


          <form>

              <h2>Registrar Operador</h2>

              <label>NomeOperador</label>
              <p></p>
              <input
                type='text'
                placeholder='Nome Operador'
                name='nome_operador'
                value={this.state.formulario.nome_operador}
                onChange={this.formChange}
              />
              <p></p>
              <label>TipoPerfil</label>
              <p></p>

              <Select
                name="id_perfil"
                options={this.state.id_perfil}
                getOptionLabel={option => option.tipo_perfil}
                getOptionValue={option => option.id_perfil}
                value={this.state.formulario.perfil}
                onChange={this.formChangeSelect('id_perfil')}
              />

              <p></p>
              <label>LoginOperador</label>
              <p></p>


              <input
                type='text'
                placeholder='Login Operador'
                name='login_operador'
                value={this.state.formulario.login_operador}
                onChange={this.formChange}
              />

              <p></p>
              <label>SenhaPerfil</label>
              <p></p>

              <input
                type='password'
                placeholder='Senha'
                name='senha_operador'
                value={this.state.formulario.senha_operador}
                onChange={this.formChange}
              />

              <p></p>

              <p></p>

              <button class="btn btn-primary" type='button' onClick={this.cadastrarOperador}>Cadastrar Operador</button>
              <p></p>
              <a href="/Operador/Lista">Voltar</a>

            </form>


          </Modal.Body>
          <Modal.Footer>
          <button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>
          </Modal.Footer>
        </Modal>




        <td><button type='button' onClick={() => this.setState({cadastrarAberto: true})} >CAdastrar </button></td>






        <p></p>

        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Nome Operador</th>
              <th>Perfil</th>
              <th>Login Operador</th>
              <th>Status</th>
              <th>Excluir</th>
              <th>Editar</th>


            </tr>
          </thead>
          <tbody>

            {

              this.state.listaOperador.map((obj) => {
                return (
                  <tr>

                    <td>{obj.nome_operador}</td>
                    <td>{obj.tipo_perfil}</td>
                    <td>{obj.login_operador}</td>
                    <td>{obj.ativo ? 'Operador Ativo' : 'Operador Desativado'}</td>


                    <td><button type='button' onClick={() => this.removerOperador(obj.id_operador)}>Excluir </button></td>
                    <td><button type='button' onClick={() => this.selecionarOperador(obj.id_operador)} >Editar </button></td>
























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


export default ListaOperador;