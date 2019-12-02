import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Label, Form, FormGroup, CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import FotoProduto from '../../components/FotoProduto';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import SelectMenu from '../../components/SelectMenu';
import Confirm from 'reactstrap-confirm';


class Produto extends Component {

  columns = [
    {
      Header: 'Código do produto',
      accessor: 'codigo_produto',
      headerClassName: "text-left",
    },
    {
      Header: 'Foto',
      accessor: 'imagem',
      headerClassName: "text-left",
      sortable: false,
      Cell: props =>
        <FotoProduto src={props.value} height="50" width="50"></FotoProduto>
    },
    {
      Header: 'Nome do produto',
      accessor: 'nome_produto',
      headerClassName: "text-left",
    },
    {
      Header: 'Descrição',
      accessor: 'descricao',
      headerClassName: "text-left",
    },
    {
      Header: 'Preço',
      accessor: 'preco',
      headerClassName: "text-left",
      Cell: props => <span>{`R$ ${props.value.toFixed(2)}`}</span>
    },
    {
      Header: 'Menu',
      accessor: 'ds_menu',
      headerClassName: "text-left",
    },
    {
      Header: 'Em promoção',
      accessor: 'promocao',
      headerClassName: "text-left",
      Cell: props => <span>{props.value ? "Sim" : "Não"}</span>
    },
    {
      Header: 'Ativo',
      accessor: 'ativo',
      headerClassName: "text-left",
      Cell: props => <span>{props.value ? "Sim" : "Não"}</span>
    },
    {
      Header: 'Editar',
      accessor: 'id_produto',
      headerClassName: "text-left",
      sortable: false,
      Cell: props =>
        <Link to={{ pathname: `/cardapio/produto/editar/${props.value}` }}>
          <Button color="secondary" size="sm">
            <i className="icon-note"></i>
          </Button>
        </Link>
    },
    {
      Header: 'Excluir',
      accessor: 'id_produto',
      headerClassName: "text-left",
      sortable: false,
      Cell: props =>
        <Button color="danger" size="sm" onClick={() => this.remover(props.value)}>
          <i className="icon-close"></i>
        </Button>
    },
  ]

  constructor(props) {
    super(props);

    this.state = {
      lista: [],
      search: "",
      filtrarMenu: "",
      somenteAtivos: true,
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    let dados = await serverRequest.request('/produto/listar');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  remover = async (id) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja remover este produto?",
      confirmColor: "success",
      confirmText: "Confimar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/produto/remover', { "id_produto": id });
      if (dados) this.obterLista();
    }
  }
  changeSwitch = (event) => {
    this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
  }

  render() {

    let lista = this.state.lista
    if (this.state.somenteAtivos) lista = lista.filter(row => row.ativo);
    if (this.state.search) {
      lista = lista.filter(row => {
        return (new RegExp(this.state.search, "i")).test([row.codigo_produto, row.nome_produto, row.descricao].join(''))
      })
    }
    if (this.state.filtrarMenu) {
      lista = lista.filter(row => String(row.id_menu) === String(this.state.filtrarMenu))
    }

    return (
      <div>
        <Card>
          <CardHeader>
            <i className='icon-book-open'></i>&nbsp;Produtos Cadastrados
          <div className="card-header-actions">
              <Link to="/cardapio/produto/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-plus"></i>&nbsp;Cadastrar
            </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <Form inline className="mb-4">
              <FormGroup className="mr-3">
                <Label className="mr-2">Procurar:</Label>
                <input
                  value={this.state.search}
                  onChange={e => this.setState({ search: e.target.value })}
                />
              </FormGroup>
              <FormGroup className="mr-3">
                <Label className="mr-2">Filtrar Menu:</Label>
                <SelectMenu
                  value={this.state.filtrarMenu}
                  onChange={e => this.setState({ filtrarMenu: e.target.value })}
                />
              </FormGroup>
              <FormGroup className="ml-auto">
                <Label className="mr-2">Somente ativos:</Label>
                <CustomInput
                  id="somenteAtivos"
                  type="switch"
                  name="somenteAtivos"
                  checked={this.state.somenteAtivos ? true : false}
                  onChange={this.changeSwitch}
                  valid
                />
              </FormGroup>
            </Form>
            <ReactTable
              data={lista}
              columns={this.columns}
              minRows={0}
              previousText="Anterior"
              nextText="Próxima"
              noDataText="Nenhum registro encontrado"
              pageText="Página"
              ofText="de"
              rowsText="registros"
              loadingText="Carregando..."
              className="table"
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Produto;
