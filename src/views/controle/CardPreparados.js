import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import Confirm from 'reactstrap-confirm';
import serverRequest from '../../utils/serverRequest';

class CardPreparados extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onHide = () => {
    this.props.onHide();
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

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  cancelarEntrega = async (id_mesa, id_item) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja cancelar essa entrega?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/item/cancelarEntrega', { "id_mesa": id_mesa, "id_item": id_item });
      if (dados) {
        this.props.atualizar()
      }
    }
  }


  Entregue = async (id_mesa, id_item) => {

    let dados = await serverRequest.request('/mesa/item/entregue', { "id_mesa": id_mesa, "id_item": id_item });
    if (dados) {
      this.props.atualizar()
    }
  }

  render() {

    return (

      <Card>
        <CardHeader>
          <i className="icon-note"></i>
          <span className="font-lg font-weight-bold">Mesa {this.props.pedido.numero}</span>
        </CardHeader>
        <CardBody>
          <div>Produto: {this.props.pedido.produtos.nome_produto}
          </div>
          <div>Quantidade: {this.props.pedido.produtos.quantidade}
          </div>
          <div className="font-xs">
            <i className="fa fa-clock-o"></i>
            {this.dateDiff(new Date(this.props.pedido.produtos.data_incluiu), new Date())}
          </div>
          <p></p>
          <Button outline variant="primary" color="danger" onClick={() => this.cancelarEntrega(this.props.pedido._id, this.props.pedido.produtos.id_item)}
            className="pull-left fa fa-trash-o">
          </Button>

          <Button outline variant="primary" color="success" onClick={() => this.Entregue(this.props.pedido._id, this.props.pedido.produtos.id_item)}
            className="pull-right fa fa-check">
          </Button>

        </CardBody>
      </Card>
      
    )
  }
}

export default CardPreparados;