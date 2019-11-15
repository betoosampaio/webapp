import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
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

  vlrTotal = (mesa) => {
    let vl = (mesa.valor_produtos * (1 + mesa.taxa_servico)) - mesa.desconto
    return `R$ ${vl.toFixed(2)}`;;
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

  statusMesa = () => {
    let status = "Aberta";
    if (this.fechada) status = "Fechada";
    if (this.encerrada) status = "Encerrada";
    return status;
  }

  render() {
    return (
      <Link to={`/mesas/detalhemesa/${this.props.mesa._id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <Card>
          <CardHeader>
            <i className="icon-calculator"></i>
            <span className="font-lg font-weight-bold">Mesa {this.props.mesa.numero}</span>
          </CardHeader>
          <CardBody>
            <div className="text-muted font-weight-bold font-md mb-1">
              {this.vlrTotal(this.props.mesa)}
            </div>
            <div className="font-xs">
              <i className="fa fa-clock-o"></i>
              {this.dateDiff(new Date(this.props.mesa.data_abriu), new Date())}
            </div>
            <div className="font-xs">            
              {this.statusMesa()}
            </div>
          </CardBody>
        </Card>
      </Link>
    );
  }
}

export default CardMesa;