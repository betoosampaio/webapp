import React from 'react';
import Select from 'react-select';
import { Table, Modal, Button } from 'react-bootstrap'
import MaskedInput from 'react-text-mask'
import CurrencyFormat from 'react-currency-format';
import CurrencyInput from 'react-currency-input';
import { Link } from 'react-router-dom'
const path = process.env.REACT_APP_SRV_PATH;
const pathWeb = process.env.REACT_APP_WEB_PATH;


class listaProduto extends React.Component {


  state = {
    editarCardapio: false,
    cadastrarCardapio: false,
    listaProduto: [],
    menu: [],
    formulario: {
      nome_produto: '',
      descricao: '',
      preco: '',
      id_menu: '',
      visivel: '1',
      promocao: '0',
      imagem: '',

    },
  }


  componentDidMount() {
    this.obterMenu();
    this.mostrarConteudo();

  }

  obterMenu = async function () {
    let res = await fetch(path + '/menu/listar', {
      method: 'POST',
      headers: {
        'token': localStorage.getItem('token')
      },
    });
    this.setState({ id_menu: await res.json() });
  }



  cadastrarProduto = async (event) => {
    console.log(this.state.formulario);

    let formulario = this.state.formulario;
    // ajustando os valores dos Select
    formulario.id_menu = formulario.id_menu.id_menu;
    formulario.preco = formulario.preco.replace(',', '.');

    try {
      let res = await fetch(path + '/produto/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(this.state.formulario)
      });
      alert('PRODUTO CADASTRADO COM SUCESSO!');
      window.location.href = pathWeb + '/Cardapio/Lista';
    } catch (error) {
      alert('ERRO NO CADASTRO');
      console.log(error);
    }

  }



  removerProduto = async (id_produto) => {

    try {
      let res = await fetch(path + '/produto/remover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ "id_produto": id_produto })
      });
      alert('Removido com sucesso !');
      this.mostrarConteudo();
    } catch (error) {
      alert('ERRO AO REMOVER');
      console.log(error);
    }

  }


  mostrarConteudo = async function () {
    let res = await fetch(path + '/produto/listar', {
      method: 'POST',
      headers: {
        'token': localStorage.getItem('token')
      },
    });


    this.setState({ listaProduto: await res.json() });

  }

  
    updateOperador = async (event) => {


        let formulario = this.state.formulario;
        formulario.id_menu = formulario.id_menu.id_menu;
        formulario.preco = formulario.preco.replace(',', '.');

        try {
            let res = await fetch(path + '/produto/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            alert('PRODUTO EDITADO COM SUCESSO!');
            window.location.href = "pathWeb +/Cardapio/Lista"
        } catch (error) {
            alert('ERRO AO EDITAR');
            console.log(error);
        }


    }




    selecionarProduto = async (event) => {

        try {
            let res = await fetch(path + '/produto/obter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ "id_produto": this.props.location.id_produto })
            });
            let data = await res.json();


            let obj = data[0];
            obj.id_menu = { id_menu: obj.id_menu, ds_menu: obj.ds_menu }
            this.setState({ formulario: obj });



        } catch (error) {

            console.log(error);
        }
    }




  formChangeInput = name => value => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[name] = value;
    this.setState({ formulario: formNewState });
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





        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.cadastrarCardapio}
          onHide={() => { this.setState({ cadastrarCardapio: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Cadastrando Cardapio
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>

              <h2>Registrar Cardápio</h2>


              <p></p>
              <label>NomeProduto</label>
              <p></p>

              <input
                type='text'
                placeholder='Nome Produto'
                name='nome_produto'
                value={this.state.formulario.nome_produto}
                onChange={this.formChange}
              />


              <p></p>
              <label>DescricaoProduto</label>
              <p></p>

              <input
                type='text'
                placeholder='Descrição do Produto'
                name='descricao'
                value={this.state.formulario.descricao}
                onChange={this.formChange}
              />


              <p></p>
              <label>Preco</label>
              <p></p>

              <CurrencyInput
                type="text"
                decimalSeparator=","
                thousandSeparator="."
                value={this.state.formulario.preco}
                name="preco"
                onChange={this.formChangeInput('preco')}
              />


              <p></p>
              <label>Menu</label>
              <p></p>

              <Select
                name="id_menu"
                options={this.state.id_menu}
                getOptionLabel={option => option.ds_menu}
                getOptionValue={option => option.id_menu}
                value={this.state.formulario.menu}
                onChange={this.formChangeSelect('id_menu')}
              />

              <p></p>


              <input
                type="checkbox"
                name='promocao'
                value='1'
                onChange={this.formChange} />Produto em Promoção
              
              
<p></p>


              <p></p>
              <label>Imagem</label>
              <p></p>

              <input type='file' name='imagem'

                value={this.state.formulario.imagem}
                onChange={this.formChange}

              />

              <p></p>

              <p></p>

              <button class="btn btn-primary" type='button' onClick={this.cadastrarProduto}>Cadastrar Cardápio</button>
              <p></p>
              <a href="/Cardapio/Lista">Voltar</a>

            </form>

          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-primary" onClick={this.updateMenu} type='button'>Editar Menu</button>
          </Modal.Footer>
        </Modal>



        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.editarCardapio}
          onHide={() => { this.setState({ editarCardapio: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Cadastrando Cardapio
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>


          <form>
                    <h3>Editar Cardapio</h3>

                    <p></p>
                    <label>NomeProduto</label>
                    <p></p>

                    <input
                        type='text'
                        name='nome_produto'
                        value={this.state.formulario.nome_produto}
                        onChange={this.formChange}
                    />

                    <p></p>
                    <label>Descricao</label>
                    <p></p>

                    <input
                        type='text'
                        name='descricao'
                        value={this.state.formulario.descricao}
                        onChange={this.formChange}
                    />

                    <p></p>
                    <label>Preco</label>
                    <p></p>

                    <CurrencyInput
                        type="text"
                        decimalSeparator=","
                        thousandSeparator="."
                        value={this.state.formulario.preco}
                        name="preco"
                        onChange={this.formChangeInput('preco')}
                    />

                    <p></p>
                    <label>menu</label>
                    <p></p>

                    <Select
                        name="id_menu"
                        options={this.state.id_menu}
                        getOptionLabel={option => option.ds_menu}
                        getOptionValue={option => option.id_menu}
                        value={this.state.formulario.id_menu}
                        onChange={this.formChangeSelect('id_menu')}
                    />

                    <p></p>



                    <input
                        type="checkbox"
                        name='visivel'
                        checked={this.state.formulario.visivel}
                        onChange={this.formChangeCheck} /> Produto visivel


                <p></p>

                    <input
                        type="checkbox"
                        name='promocao'
                        checked={this.state.formulario.promocao}
                        onChange={this.formChangeCheck} />Produto em Promoção

                            <p></p>


                    <p></p>



                    <button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>

                    <p></p>
                    <a href="/Cardapio/Lista">Voltar</a>


                </form>


          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-primary" onClick={this.updateMenu} type='button'>Editar Menu</button>
          </Modal.Footer>
        </Modal>




        <Button onClick={() => this.setState({ cadastrarCardapio: 'true' })} >Cadastrar novo Cardápio</Button>
        <p></p>
        <Link to='/Menu/Lista' >Lista de Menu</Link>
        <p></p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome do Prato</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Menu</th>
              <th>Status</th>
              <th>promoção</th>
              <th>Excluir</th>
              <th>Editar</th>
            </tr>

          </thead>

          <tbody>

            {

              this.state.listaProduto.map((obj) => {
                return (

                  <tr>


                    <td>{obj.nome_produto}</td>
                    <td>{obj.descricao}</td>
                    <td>{obj.preco.toString().replace('.', ',')}</td>
                    <td>{obj.ds_menu}</td>
                    <td>{obj.visivel ? 'Ativo' : 'Desativado'}</td>
                    <td>{obj.promocao ? 'sim' : 'não'}</td>

                    <td><button type='button' onClick={() => this.removerProduto(obj.id_produto)}>Excluir </button></td>
                    <td><button type='button' onClick={() => this.setState({editarCardapio:true})}>Editar </button></td>



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


export default listaProduto;
