import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, InputGroup, Label } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal';
import ReactTable from 'react-table';
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
      Cell: props =>
        <Button color="danger" size="sm" onClick={() => this.setState({ showDelete: true, idSelecionado: props.value })}>
          <i className="icon-close"></i>
        </Button>
    },
  ]

  constructor(props) {
    super(props);

    this.state = {
      lista: [],
      showDelete: false,
      idSelecionado: 0,
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
    let dados = await serverRequest.request('/menu/remover', { "id_menu": id });
    if (dados) {
      this.obterLista();
      this.setState({ showDelete: false });
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

            <FormGroup className="pull-right">
              <Label className="mr-2">Somente ativos:</Label>
              <AppSwitch
                name="somenteAtivos"
                variant={'pill'}
                color={'success'}
                checked={this.state.somenteAtivos ? true : false}
                onChange={this.changeSwitch}
              />
            </FormGroup>

            <FormGroup className="pull-left">
              <Label className="mr-2">Procurar:</Label>
              <input
                value={this.state.search}
                onChange={e => this.setState({ search: e.target.value })}
              />
            </FormGroup>


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
            <Button variant="secondary" color="danger" onClick={() => this.setState({ showDelete: false })}>Cancelar</Button>
            <Button variant="primary" color="success" onClick={() => this.remover(this.state.idSelecionado)}>Confirmar</Button>
          </Modal.Footer>

        </Modal>

      </div>
    );
  }
}

export default ListaMenu;
