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
import Ambiente from '../ambiente/Ambiente';

class EditarPerfil extends Component {

	constructor(props) {
		super(props);
		this.state = {
      showConfirm: false,		
      ds_ambiente: "",	
		};
	}

	componentDidMount() {
		this.obter(this.props.match.params.id);
	}

	obter = async (id) => {
		let dados = await serverRequest.request('/ambiente/obter', { "id_ambiente": id });
		if (dados) {
			this.setState(dados[0]);
		}
	}

	editar = async (event) => {
		event.preventDefault();
		let dados = await serverRequest.request('/ambientel/editar', this.state);
		if (dados) {
			window.location.href = '#/ambiente';
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
				<Tabs defaultActiveKey="ambiente">
					<Tab eventKey="ambiente" title="Ambiente">
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
										<Input name="ds_ambiente" value={this.state.ds_ambiente} onChange={this.changeInput} required minLength="4" placeholder="Garçom" />
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
								<Button variant="primary" color="danger" onClick={() => { window.location.href = '#/ambiente' }} >Cancelar</Button>
								<Button variant="primary" color="success" onClick={this.editar}  >Confirmar</Button>
							</Modal.Footer>
						</Card>
					</Tab>
					<Tab eventKey="ambiente" title="Ambiente">
						<Ambiente id_ambiente={this.props.match.params.id}/>
					</Tab >
				</Tabs>
			</div>
		);
	}
}

export default EditarPerfil;
