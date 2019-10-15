import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

class Page401 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">401</h1>
                <h4 className="pt-3">Autenticação Necessária</h4>
                <p className="text-muted float-left">Por favor realize o <Link to="/login"><span>login</span></Link> no sistema.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page401;
