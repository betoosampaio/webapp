import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import IncluirCaixa from './IncluirCaixa';
import { Link } from 'react-router-dom';

class ListaCaixa extends Component {

  constructor(props) {
    super(props);

    this.state = {
      caixas: [],
    };
  }

  columns = [
    {
      Header: 'Data Abertura',
      accessor: "data_abriu",
      headerClassName: "text-left",
      Cell: props => <span>{new Date(props.value).toLocaleString()}</span>
    },
    {
      Header: 'Número',
      accessor: "numero",
      headerClassName: "text-left",
    },
    {
      Header: 'Status',
      accessor: "aberta",
      headerClassName: "text-left",
      Cell: props => <span>{props.original.status}</span>
    },
    {
      Header: 'Responsável',
      accessor: "nome_operador",
      headerClassName: "text-left",
    },
    {
      Header: 'Acessar',
      accessor: '_id',
      headerClassName: "text-left",
      sortable: false,
      Cell: props =>
        <Link to={{ pathname: `/caixas/detalhe/${props.value}` }}>
          <Button color="secondary" size="sm">
            <i className="fa fa-reply"></i>
          </Button>
        </Link>
    },
  ]

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    let dados = await serverRequest.request('/caixa/listar');
    if (dados) {
      this.setState({ caixas: dados });
    }
  }

  caixaAdicionado = () => {
    this.setState({ modalIncluirCaixa: false })
    this.obterLista();
  }

  render() {
    return (
      <div>

        <p></p>
        <Card>
          <CardHeader>
            <i className='icon-calculator' />Caixas
            <div className="card-header-actions">
              <Button color="success" size="sm" onClick={() => this.setState({ modalIncluirCaixa: true })}>
                <i className="icon-plus mr-1"></i>Abrir Caixa
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={this.state.caixas}
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
        <IncluirCaixa
          show={this.state.modalIncluirCaixa}
          onHide={() => { this.setState({ modalIncluirCaixa: false }) }}
          caixaadicionado={this.caixaAdicionado} />
      </div>
    );
  }
}

export default ListaCaixa;
