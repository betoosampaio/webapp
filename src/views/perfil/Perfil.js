import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Label, Form, FormGroup, CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Perfil extends Component {

  columns = [
    {
      Header: 'Perfil',
      accessor: 'ds_perfil',
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
      accessor: 'id_perfil',
      headerClassName: "text-left",
      sortable: false,
      Cell: props =>this.botaoEditar(props.value)       
    },
    {
      Header: 'Excluir',
      accessor: 'id_perfil',
      headerClassName: "text-left",
      sortable: false,
      Cell: props => this.botaoRemover(props.value)
    },
  ]

  botaoEditar(id) {
    if (id === 1)
      return (<></>);
    else
      return (
        <Link to={{ pathname: `/perfil/editar/${id}` }}>
          <Button color="secondary" size="sm">
            <i className="icon-note"></i>
          </Button>
        </Link>
      );
  }

  botaoRemover(id) {
    if (id === 1)
      return (<></>);
    else
      return (
        <Button color="danger" size="sm" onClick={() => this.remover(id)}>
          <i className="icon-close"></i>
        </Button>
      );
  }

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

  obterLista = async () => {
    let dados = await serverRequest.request('/perfil/listar');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  remover = async (id) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja remover este perfil?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/perfil/remover', { "id_perfil": id });
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
        return (new RegExp(this.state.search, "i")).test(row.ds_perfil)
      })
    }

    return (

      <div>
        <Card>
          <CardHeader>
            <i className='icon-people'></i>&nbsp;Perfis Cadastrados
          <div className="card-header-actions">
              <Link to="/perfil/cadastrar">
                <Button color="success" size="sm">
                  <i className="icon-user-follow"></i>&nbsp;Cadastrar
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

export default Perfil;
