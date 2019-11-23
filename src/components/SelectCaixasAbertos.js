import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../utils/serverRequest';

class SelectCaixasAbertos extends Component {

	constructor(props) {
		super(props);

		this.state = {
			lista: [],
		};
	}

	componentDidMount() {
		this.obterDados();
	}

	obterDados = async () => {
		let dados = await serverRequest.request('/caixa/listar');
		if (dados) {
			this.setState({ lista: dados });
			if(dados.length > 0) // selecionar o primeiro por default
				this.props.selecionar(dados[0]._id, dados[0].numero);
		}
	}

	render() {
		return (
			<Input type="select" {...this.props} selecionar="">				
				{
					this.state.lista.map(obj => {
						return (
							<option key={obj._id} value={obj._id}>{obj.numero}</option>
						)
					})
				}
				{
					this.state.lista.length === 0 &&
					<option value="">Nenhum caixa aberto</option>
				}
			</Input>
		)
	}
}

export default SelectCaixasAbertos;