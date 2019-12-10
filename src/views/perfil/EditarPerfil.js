import React, { Component } from 'react';
import {
	Card, CardHeader, CardBody, Button, FormGroup, Label, Input, InputGroup,
	InputGroupAddon, InputGroupText
} from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal';
import Permissao from './Permissao';

class EditarPerfil extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showConfirm: false,
			ds_perfil: "",
		};
	}

	componentDidMount() {
		this.obter(this.props.match.params.id);
	}

	obter = async (id) => {
		let dados = await serverRequest.request('/perfil/obter', { "id_perfil": id });
		if (dados) {
			this.setState(dados[0]);
		}
	}

	editar = async (event) => {
		event.preventDefault();
		let dados = await serverRequest.request('/perfil/editar', this.state);
		if (dados) {
			window.location.href = '#/perfil';
		}
	}

	changeInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	changeSwitch = (event) => {
		this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
	}

	render() {
		return (
			<div>
				<Tabs defaultActiveKey="perfil">
					<Tab eventKey="perfil" title="Dados Perfil">
						<Card>
							<CardHeader>
								<strong>Editar Perfil</strong>
							</CardHeader>
							<CardBody>
								<FormGroup>
									<Label>Perfil:</Label>
									<InputGroup>
										<InputGroupAddon addonType="append">
											<InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
										</InputGroupAddon>
										<Input name="ds_perfil" value={this.state.ds_perfil} onChange={this.changeInput} required minLength="4" placeholder="Garçom" />
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label>Ativo:</Label>
									<InputGroup>
										<AppSwitch name="ativo" className={'mx-1'} variant={'pill'} color={'success'} checked={this.state.ativo ? true : false} onChange={this.changeSwitch} />
									</InputGroup>
								</FormGroup>

							</CardBody>
							<Modal.Footer>
								<Button variant="primary" color="danger" onClick={() => { window.location.href = '#/perfil' }} >Cancelar</Button>
								<Button variant="primary" color="success" onClick={this.editar}  >Confirmar</Button>
							</Modal.Footer>
						</Card>
					</Tab>
					<Tab eventKey="permissao" title="Permissões">
						<Permissao id_perfil={this.props.match.params.id} />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default EditarPerfil;
