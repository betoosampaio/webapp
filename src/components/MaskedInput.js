import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'reactstrap';
import vanilla from 'vanilla-masker';

class MaskedInput extends Component {

  onChange = (event) => {
    event.target.value = vanilla.toPattern(event.target.value, this.props.mascara)
    this.props.onChange(event);
  }

  render() {
    return (
      <Input {...this.props} onChange={this.onChange}></Input>
    )
  }
}

export default MaskedInput;