import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';


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

        </CardBody>
      </Card>
    )
  }
}

export default CardPreparados;