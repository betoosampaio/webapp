import React, { Component } from 'react';
import { Input } from 'reactstrap';
import vanilla from 'vanilla-masker';

class MaskedNumberInput extends Component {

  onChange = (event) => {
    event.target.value = vanilla.toNumber(event.target.value)
    this.props.onChange(event);
  }

  render() {
    return (
      <Input {...this.props} onChange={this.onChange}></Input>
    )
  }
}

export default MaskedNumberInput;