import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'

class CadastrarPerfil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ds_perfil: '',
      validarSePerfilExiste: '',

      validacao: {
        ds_perfil: { valid: false, invalid: false, msg: '' },
      },
    };
  }


  cadastrar = async (event) => {
    event.preventDefault();

    let valid = true;

    Object.keys(this.state.validacao).forEach(p => {
      if (!this.state.validacao[p].valid) {
        valid = false;
      }
    });

    if (!valid) return alert('Preencha todos os campos corretamente');

    let dados = await serverRequest.request('/perfil/cadastrar', this.state);
    if (dados) {
      this.setState({ showCadastrado: true });
    }

  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  validarPerfil = (event) => {
    let valid = false;
    let val = event.target.value;
    if (!val) {
    }
    else {
      valid = false;
    }
    let newState = Object.assign({}, this.state.validacao);
    newState.ds_perfil.valid = valid;
    this.setState({ validacao: newState });
  }

  validarSePerfilExiste = async (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Deve conter mais do que 4 caracteres';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.ds_perfil.valid = valid;
    newState.ds_perfil.invalid = invalid;
    newState.ds_perfil.msg = msg;
    this.setState({ validacao: newState });

    let dados = await serverRequest.request('/perfil/checarSePerfilExiste', { ds_perfil: val });
    if (dados.exists) {
      let newState = Object.assign({}, this.state.validacao);
      newState.ds_perfil.valid = false;
      newState.ds_perfil.invalid = true;
      newState.ds_perfil.msg = 'Esta perfil já está cadastrado';
      this.setState({ validacao: newState });
    }
  }

  limparState = () => {
    window.location.reload();
  }



  render() {
    return (
      <form name="form" onSubmit={this.cadastrar}>
        <Card>
          <CardHeader>
            <strong>Cadastrar Perfil</strong>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label>Perfil:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>

                <Input
                  name="ds_perfil"
                  value={this.state.ds_perfil}
                  onChange={this.changeInput}
                  placeholder="Garçom"
                  onBlur={this.validarSePerfilExiste}
                  valid={this.state.validacao.ds_perfil.valid}
                  invalid={this.state.validacao.ds_perfil.invalid}
                  required
                  minLength="3"
                  maxLength="100"
                />

                <FormFeedback>{this.state.validacao.ds_perfil.msg}</FormFeedback>

              </InputGroup>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" className="pull-right" color="success"><i className="fa fa-check"></i>Confirmar</Button>
          </CardFooter>
        </Card>

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showCadastrado}
          onHide={() => { this.setState({ showCadastrado: false }) }}
          backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Perfil Cadastrado com sucesso!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" color="success" onClick={this.limparState}  >Confirmar</Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

export default CadastrarPerfil;
