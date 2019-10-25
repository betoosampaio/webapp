import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import SelectPerfil from '../../components/selectPerfil/SelectPerfil';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal';

class EditarOperador extends Component {

	constructor(props) {

		super(props);
		this.state = {
			showPassword: false,
			showConfirm: false,
			id_operador: "",
			nome_operador: "",
			id_perfil: "",
			login_operador: "",
			senha_operador: "",
			ativo: "",
		};
	}

	componentDidMount() {
		this.obter(this.props.match.params.id);
	}


	mostrarPassword = () =>{
		const {showPassword} = this.state;
		this.setState({showPassword: !showPassword});
	}

	obter = async (id) => {
		let dados = await serverRequest.request('/operador/obter', { "id_operador": id });
		if (dados) {
			this.setState(dados[0]);
		}
	}

	editar = async (event) => {
		event.preventDefault();
		let dados = await serverRequest.request('/operador/editar', this.state);
		if (dados) {
			window.location.href = '#/operador';
		}
	}

	changeInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	changeSwitch = (event) => {
		this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
	}

	render() {
		const{showPassword} = this.state;
		return (

			<Card>
				<CardHeader>
					<strong>Editar Operador</strong>
				</CardHeader>
				<CardBody>

					<Modal
						size="md"
						aria-labelledby="contained-modal-title-vcenter"
						centered
						show={this.state.showConfirm}
						onHide={() => { this.setState({ showConfirm: false }) }}
						backdrop='static'
					>
						<Modal.Header closeButton>
							<Modal.Title>Confirmação</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<p>Tem certeza de que deseja editar este Operador?</p>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="primary" color="danger" onClick={() => this.setState({ showConfirm: false })} >Cancelar</Button>
							<Button variant="primary" color="success" onClick={this.editar}  >Salvar</Button>
						</Modal.Footer>
					</Modal>

		

					<FormGroup>
						<Label>Nome:</Label>
						<InputGroup>
							<InputGroupAddon addonType="append">
								<InputGroupText><i className="fa fa-user"></i></InputGroupText>
							</InputGroupAddon>
							<Input name="nome_operador" value={this.state.nome_operador} onChange={this.changeInput} required minLength="4" placeholder="Nome do Operador" />
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<Label>Perfil:</Label>
						<InputGroup>
							<InputGroupAddon addonType="append">
								<InputGroupText><i className="fa fa-group"></i></InputGroupText>
							</InputGroupAddon>
							<SelectPerfil name="id_perfil" value={this.state.id_perfil} onChange={this.changeInput} required></SelectPerfil>
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<Label>Login:</Label>
						<InputGroup>
							<InputGroupAddon addonType="append">
								<InputGroupText><i className="fa fa-id-card"></i></InputGroupText>
							</InputGroupAddon>
							<Input name="login_operador" value={this.state.login_operador} onChange={this.changeInput} required placeholder="gerente" />
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<Label>Senha:</Label>
						<InputGroup>
							<InputGroupAddon addonType="append">
								<InputGroupText><i className="fa fa-key"></i></InputGroupText>
							</InputGroupAddon>
							<Input
								type={(showPassword) ? "text" : "password"}
								name="senha_operador"
								value={this.state.senha_operador}
								onChange={this.changeInput}
								required
								placeholder="senha"
							
							/>

							<i
							 className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
							 onClick={this.mostrarPassword}
							 />

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
					<Button variant="primary" color="danger" onClick={() => { window.location.href = '#/operador' }} >Cancelar</Button>
					<Button variant="primary" color="success" onClick={this.editar}  >Salvar</Button>
				</Modal.Footer>
			</Card>

		);
	}
}

export default EditarOperador;