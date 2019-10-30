import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

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
          type={(show) ? "text" : "password"}
          {...this.props}
        />
        <InputGroupAddon
          addonType="append"
          onClick={() => { this.setState({ show: !show }) }}
          style={{ cursor: "pointer" }}>
          <InputGroupText>
            <i className={`fa ${show ? "fa-eye-slash" : "fa-eye"} form-control-feedback`} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    )
  }
}

export default PasswordInput;