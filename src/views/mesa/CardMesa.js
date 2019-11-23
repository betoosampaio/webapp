import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
class CardMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


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
      message: "Tem certeza que deseja encerrar essa conta?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/fechar', { "id_mesa": id_mesa });
      if (dados) this.props.atualizar();
    }
  }

  render() {

    let classeStatus = () => {
      if (this.props.mesa.aberta)
        return "success";
      else if (this.props.mesa.fechada && !this.props.mesa.encerrada)
        return "warning";
      else if (this.props.mesa.encerrada)
        return "danger";
    }

    return (
      <Link to={`/mesas/detalhemesa/${this.props.mesa._id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <Card>
          <CardHeader>
            <i className="icon-note"></i>
            <span className="font-lg font-weight-bold">Mesa {this.props.mesa.numero}</span>
          </CardHeader>
          <CardBody>
            <div className={"my-0 callout callout-" + classeStatus()}>
              {this.props.mesa.status}

              <div className="text-muted font-weight-bold font-md mb-1">
                {this.valorProdutos(this.props.mesa.produtos)}
              </div>

              <div className="font-xs">
                <i className="fa fa-clock-o"></i>
                {this.dateDiff(new Date(this.props.mesa.data_abriu), new Date())}
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    );
  }
}

export default CardMesa;