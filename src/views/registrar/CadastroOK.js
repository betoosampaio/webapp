import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import {Link} from 'react-router-dom';

class CadastroOK extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" className="text-center">
              <h1 className="display-3 mr-4">Parabéns!</h1>
              <h4 className="pt-3">Cadastro realizado com sucesso!</h4>
              <p className="text-muted pt-3">Em breve você receberá um e-mail de confirmação</p>
              <p><Link to="/login"><span>Acessar o sistema</span></Link></p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CadastroOK;
