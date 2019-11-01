import React, { Component } from 'react';
import { Table, Card, CardHeader, CardBody, CardFooter, Button, Input, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import Confirm from 'reactstrap-confirm';
import SelectProduto from '../../components/SelectProduto';


class DetalheMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      id_mesa: "",
      codigo_produto: "",
      id_produto: "",
      quantidade: 0,

    };
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/mesa/obter', { "id_mesa": id });
    if (dados) {
      this.setState(dados[0]);
    }
  }

  vlrProdutos = () => {
    let vl = 0;
    vl = this.state.produtos.reduce((sum, key) =>
      sum + (key.removido ? 0 : key.preco * key.quantidade), 0)
    return `R$ ${vl.toFixed(2)}`;
  }

  qtdProdutos = (produtos) => {
    let qt = 0;
    qt = this.state.produtos.reduce((sum, key) =>
      sum + (key.removido ? 0 : parseInt(key.quantidade)), 0)
    return qt;
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  cadastrar = async (event) => {
    let obj = {

      id_mesa: this.state._id,
      id_produto: this.state.codigo_produto[0],
      quantidade: this.state.quantidade,

    }

    console.log(obj)

    let dados = await serverRequest.request('/mesa/incluirItem', obj);

    if (dados) {
      this.setState({ modalAdicionarItem: false });
      window.parent.location.reload();
    }
  }

  removerMesa = async (id_mesa) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que quer cancelar essa conta?",
      confirmColor: "danger",
      confirmText: "Sim",
      cancelText: "Não",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/remover', { "id_mesa": id_mesa });
      if (dados) {
        window.location.href = '/#/mesas'
      }

    }
  }

  fecharMesa = async (id_mesa) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que quer encerrar essa conta?",
      confirmColor: "success",
      confirmText: "Sim",
      cancelText: "Não",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/fechar', { "id_mesa": id_mesa });
      if (dados) {
        window.location.href = '/#/mesas'
      }
    }
  }

  decrementar() {
    if(this.state.quantidade <= 0){
 
    }else{   
      this.setState({ quantidade: this.state.quantidade - 1 })
    }

  }

  incrementar() {
    this.setState({ quantidade: this.state.quantidade + 1 })
  }



  render() {
    return (
      <div>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalAdicionarItem}
          onHide={() => { this.setState({ modalAdicionarItem: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Adicionar novo item a mesa
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup>
              <Label>Produto:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-list-ul"></i></InputGroupText>
                </InputGroupAddon>

                <SelectProduto
                  name="codigo_produto"
                  value={this.state.codigo_produto}
                  onChange={this.changeInput}
                  required></SelectProduto>

              </InputGroup>

            </FormGroup>



            <Button onClick={this.incrementar.bind(this)} color="success" size="sm" style={{marginRight:"5px"}}>
              <i className="icon-plus"></i>
            </Button>
 
            <Button onClick={this.decrementar.bind(this)} color="danger" size="sm">
              <i className="icon-minus"></i>
            </Button>


<p></p>

<label>Quantidade</label>
            <Input
              name="quantidade"
              placeholder="Quantidade"
              value={this.state.quantidade}
        
            />






          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={this.cadastrar}>Incluir</Button>
          </Modal.Footer>
        </Modal>




        <h2>
          Mesa {this.state.numero}

        </h2>

        <br></br>
        <Card>
          <CardHeader>
            <i className='icon-list'></i>&nbsp; Produtos
                        <div className="card-header-actions">
              <Button onClick={() => this.setState({ modalAdicionarItem: true })} color="success" size="sm">
                <i className="icon-plus"></i>&nbsp;Incluir
                        </Button>
            </div>
          </CardHeader>
          <CardBody>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.produtos.map((obj) => {
                    return (
                      <tr>
                        <td>{obj.nome_produto}</td>
                        <td>{obj.quantidade}</td>
                        <td>{`R$ ${(obj.preco * obj.quantidade).toFixed(2).replace('.', ',')}`}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>{this.qtdProdutos()}</th>
                  <th>{this.vlrProdutos()}</th>
                </tr>
              </tfoot>
            </Table>
          </CardBody>
          <CardFooter>
            <Button className="pull-right" color="success" onClick={() => this.fecharMesa(this.state._id)}><i className="icon-check"></i> Encerrar Conta</Button>
            <Button title="Cancelar Conta" className="pull-right mr-2" color="danger" onClick={() => this.removerMesa(this.state._id)} ><i className="icon-ban"></i></Button>
          </CardFooter>
        </Card>
      </div >
    );
  }
}

export default DetalheMesa;
