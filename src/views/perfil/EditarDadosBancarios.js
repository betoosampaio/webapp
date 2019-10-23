import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';
import SelectBanco from '../../components/selectBanco/SelectBanco'
import Modal from 'react-bootstrap/Modal'
import MaskedInput from 'react-text-mask';



class EditarDadosBancarios extends Component {

  constructor(props) {

    super(props);
    this.state = {
      showConfirm: false,
      pagamento_app: "",
      codigo_banco: "",
      id_tipo_cadastro_conta: "",
      id_tipo_conta: "",
      agencia: "",
      conta: "",
      digito: "",
    };
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/restaurante/obter', { "id_restaurante": id });
    if (dados) {
      this.setState(dados[0]);
    }
  }

  editar = async (event) => {
    event.preventDefault();

    let obj = {

      cpf_administrador: this.state.cpf_administrador.replace(/\D/g, ''),
      nome_administrador: this.state.nome_administrador,
      celular: this.state.celular.toString().replace(/\D/g, ''),
      email: this.state.email,

      cnpj: this.state.cnpj,
      razao_social: this.state.razao_social,
      nome_restaurante: this.state.nome_restaurante,
      cep: this.state.cep.replace(/\D/g, ''),
      logradouro: this.state.logradouro,
      numero: this.state.numero,
      complemento: this.state.complemento,
      bairro: this.state.bairro,
      municipio: this.state.municipio,
      uf: this.state.uf,

      codigo_banco: this.state.codigo_banco || "0",
      id_tipo_cadastro_conta: this.state.id_tipo_cadastro_conta || "0",
      id_tipo_conta: this.state.id_tipo_conta || "0",
      agencia: this.state.agencia || "0",
      conta: this.state.conta || "0",
      digito: this.state.digito || "0",

      codigo_restaurante: this.state.codigo_restaurante,
      login: this.state.login,
      senha: this.state.senha,
    }

    //console.log(obj);

    let dados = await serverRequest.request('/restaurante/editar/dadosBancarios', obj);
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


      <Card>
        <CardHeader>
          <h5><b>Editar dados bancários</b></h5>
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
              <p>Tem certeza de que deseja Editar Dados Bancários? </p>
            </Modal.Body>

            <Modal.Footer>

              <Button variant="primary" color="danger" onClick={() => this.setState({ showConfirm: false })} >Cancelar</Button>
              <Button variant="primary" color="success" onClick={this.editar}  >Salvar</Button>
            </Modal.Footer>

          </Modal>

          <FormGroup className="mt-4">
            <InputGroup>
              <Label>Aceitar pagamentos pelo App:</Label>
              <AppSwitch name="pagamento_app" className={'mx-3'} variant={'pill'} color={'success'} checked={this.state.pagamento_app ? true : false} onChange={this.changeSwitch} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Instituição: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <SelectBanco
                required
                name="codigo_banco"
                value={this.state.codigo_banco}
                onChange={this.changeInput}
                disabled={this.state.pagamento_app ? false : true}>
              </SelectBanco>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Tipo cadastro conta: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                required
                type="select"
                name="id_tipo_cadastro_conta"
                value={this.state.id_tipo_cadastro_conta}
                onChange={this.changeInput}
                disabled={this.state.pagamento_app ? false : true}>
                <option value="0">Selecione</option>
                <option value="1">Pessoa Física</option>
                <option value="2">Pessoa Jurídica</option>
              </Input>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Tipo conta: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                required
                type="select"
                name="id_tipo_conta"
                value={this.state.id_tipo_conta}
                onChange={this.changeInput}
                disabled={this.state.pagamento_app ? false : true}>
                <option value="0">Selecione</option>
                <option value="1">Conta Corrente</option>
                <option value="2">Conta Poupança</option>
              </Input>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Agência: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input className="form-control"
                name="agencia"
                placeholder="Agência"
                value={this.state.agencia}
                onChange={this.changeInput}
                mask={[/\d/, /\d/, /\d/, /\d/]}
                disabled={this.state.pagamento_app ? false : true} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Conta: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input className="form-control"
                name="conta"
                value={this.state.conta}
                onChange={this.changeInput}
                placeholder="Conta"
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                guide={false}
                disabled={this.state.pagamento_app ? false : true}
              />
              <Label> <b> - </b> </Label> <Input className="form-control"
                name="digito"
                value={this.state.digito}
                onChange={this.changeInput}
                placeholder="Dígito"
                mask={[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/]}
                guide={false}
                disabled={this.state.pagamento_app ? false : true} />
            </InputGroup>
          </FormGroup>

        </CardBody>

        <Modal.Footer>
          <Button variant="primary" color="danger" onClick={() => { window.location.href = '#/perfil' }} >Cancelar</Button>
          <Button type="submit" className="pull-right" color="success" onClick={() => this.setState({ showConfirm: true })} ><i className="fa fa-check"></i> Confirmar</Button>
        </Modal.Footer>
      </Card>


    );
  }
}

export default EditarDadosBancarios;