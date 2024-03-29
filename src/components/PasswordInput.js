import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormFeedback } from 'reactstrap';

class PasswordInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    let { show } = this.state;
    return (
      <InputGroup>
        <InputGroupAddon addonType="append">
          <InputGroupText><i className="fa fa-key"></i></InputGroupText>
        </InputGroupAddon>
        <Input     
          {...this.props}
          type={(show) ? "text" : "password"}
        />
        <InputGroupAddon
          addonType="append"
          onClick={() => { this.setState({ show: !show }) }}
          style={{ cursor: "pointer" }}>
          <InputGroupText>
            <i className={`fa ${show ? "fa-eye-slash" : "fa-eye"} form-control-feedback`} />
          </InputGroupText>
        </InputGroupAddon>
        <FormFeedback>{this.props.feedbackmessage}</FormFeedback>
      </InputGroup>
    )
  }
}

export default PasswordInput;