import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../utils/serverRequest';

class SelectBanco extends Component {

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
		let dados = await serverRequest.request('/obterEspecialidades');
		if (dados) {
			this.setState({ lista: dados });
		}
	}

	render() {
		return (
			<Input type="select" {...this.props}>
				<option value="">Selecione</option>
				{
					this.state.lista.map(obj => {
						return (
							<option key={obj.id_especialidade} value={obj.id_especialidade}>{obj.ds_especialidade}</option>
						)
					})
				}
			</Input>
		)
	}
}

export default SelectBanco;