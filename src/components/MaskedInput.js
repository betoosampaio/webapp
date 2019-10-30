import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'reactstrap';
import vanilla from 'vanilla-masker';

class MaskedInput extends Component {

  componentDidMount() {
    if (this.props.pattern)
      vanilla(ReactDOM.findDOMNode(this.refs.input)).maskPattern(this.props.pattern);
  }

  render() {
    return (
      <Input {...this.props} ref="input"></Input>
    )
  }
}

export default MaskedInput;