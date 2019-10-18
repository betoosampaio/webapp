import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import '../../scss/styles/pagination.css';

class Registrar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1
    }
  }

  renderStep = () => {
    switch (this.state.step) {
      case 1:
        return <Step1 state={this.state} saveValues={this.saveValues} nextStep={this.nextStep} />
      case 2:
        return <Step2 state={this.state} saveValues={this.saveValues} nextStep={this.nextStep} previousStep={this.previousStep} />
      case 3:
        return <Step3 state={this.state} saveValues={this.saveValues} nextStep={this.nextStep} previousStep={this.previousStep} />
      case 4:
        return <Step4 state={this.state} saveValues={this.saveValues} previousStep={this.previousStep} cadastrar={this.cadastrar} />
      default:
        return <Step1 state={this.state} saveValues={this.saveValues} nextStep={this.nextStep} />
    }
  }

  saveValues = (step, values, callback) => {
    this.setState({ [step]: values }, callback);
  }

  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  }

  previousStep = () => {
    this.setState({ step: this.state.step - 1 });
  }

  goToStep = (step) => {
    this.setState({ step: step });
  }

  cadastrar = async () => {
    let obj = {
      ...this.state.Step1, 
      ...this.state.Step2,
      ...this.state.Step3,
      ...this.state.Step4,
    }

    let dados = await serverRequest.request('/restaurante/cadastrar', obj);
    if (dados) {
      window.location.href = '#/cadastrook';
    }
  }

  render() {
    return (
      <div className="align-items-center">
        <Row className="justify-content-center mt-4">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardHeader >
                <div className="pagination p6">
                  <ul>
                    <li className={this.state.step === 1 ? "is-active" : ""}></li>
                    <li className={this.state.step === 2 ? "is-active" : ""}></li>
                    <li className={this.state.step === 3 ? "is-active" : ""}></li>
                    <li className={this.state.step === 4 ? "is-active" : ""}></li>
                  </ul>
                </div>
              </CardHeader>
              <CardBody className="p-4">{this.renderStep()}</CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Registrar;