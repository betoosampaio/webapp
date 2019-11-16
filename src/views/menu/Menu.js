import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Label, Form, CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import ReactTable from 'react-table';
import Confirm from 'reactstrap-confirm';
import 'react-table/react-table.css';

class ListaMenu extends Component {

  columns = [
    {
      Header: 'Descrição',
      accessor: 'ds_menu',
      headerClassName: "text-left",
    },
    {
      Header: 'Ativo',
      accessor: 'ativo',
      headerClassName: "text-left",
      Cell: props => <span>{props.value ? "Sim" : "Não"}</span>
    },
    {
      Header: 'Editar',
      accessor: 'id_menu',
      headerClassName: "text-left",
      sortable: false,
      Cell: props =>
        <Link to={{ pathname: `/cardapio/menu/editar/${props.value}` }}>
          <Button color="secondary" size="sm">
            <i className="icon-note"></i>
          </Button>
        </Link>
    },
    {
      Header: 'Excluir',
      accessor: 'id_menu',
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
      somenteAtivos: true,
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async function () {
    let dados = await serverRequest.request('/menu/listar');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  remover = async (id) => {

    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja remover este menu?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/menu/remover', { "id_menu": id });
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
        return (new RegExp(this.state.search, "i")).test(row.ds_menu)
      })
    }

    return (
      <div>
        <Card>
          <CardHeader>
            <i className='icon-book-open'></i>&nbsp;Menus Cadastrados
          <div className="card-header-actions">
              <Link to="/cardapio/menu/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-plus"></i>&nbsp;Cadastrar
            </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
          <Form inline className="mb-3">
              <FormGroup>
                <Label className="mr-2">Procurar:</Label>
                <input
                  value={this.state.search}
                  onChange={e => this.setState({ search: e.target.value })}
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

export default ListaMenu;
