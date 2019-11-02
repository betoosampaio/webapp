import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
class CardMesa extends Component {

  dateDiff = (dataIni, dataFim) => {
    let delta = Math.abs(dataIni - dataFim) / 1000;

    let d = Math.floor(delta / 86400);
    delta -= d * 86400;

    let h = Math.floor(delta / 3600) % 24;
    delta -= h * 3600;

    let m = Math.floor(delta / 60) % 60;
    delta -= m * 60;

    return ` ${d ? d + "d" : ""} ${h ? h + "h" : ""} ${m}m`;
  }

  valorProdutos = (produtos) => {
    let vl = 0;
    if (produtos)
      vl = produtos.reduce((sum, key) =>
        sum + (key.removido ? 0 : key.preco * key.quantidade), 0)
    return `R$ ${vl.toFixed(2)}`;
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
      if (dados) this.props.atualizar();
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
      if (dados) this.props.atualizar();

    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <i className="icon-calculator"></i>
          <span className="font-lg font-weight-bold">Mesa {this.props.mesa.numero}</span>
          <div className="card-header-actions">
            <Button onClick={() => this.fecharMesa(this.props.mesa._id)} title="Encerrar Conta" color="link" className="card-header-action"><i className="icon-check"></i></Button>
            <Button onClick={() => this.removerMesa(this.props.mesa._id)} title="Cancelar Conta" color="link" className="card-header-action"><i className="icon-ban"></i></Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="text-muted font-weight-bold font-md mb-1">
            {this.valorProdutos(this.props.mesa.produtos)}
          </div>
          <div className="font-xs">
            <i className="fa fa-clock-o"></i>
            {this.dateDiff(new Date(this.props.mesa.data_abertura), new Date())}
          </div>
        </CardBody>
        <CardFooter className="px-3 py-2">
          <Link to={`/mesas/detalhemesa/${this.props.mesa._id}`}>
            <span className="font-weight-bold font-xs btn-block text-muted">Detalhes
              <i className="fa fa-angle-right float-right font-lg"></i></span>
          </Link>
        </CardFooter>
      </Card>
    );
  }
}

export default CardMesa;