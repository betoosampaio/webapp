import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'reactstrap';
import vanilla from 'vanilla-masker';

class MaskedMoneyInput extends Component {

  componentDidMount() {
    vanilla(ReactDOM.findDOMNode(this.refs.input)).maskMoney({
      precision: this.props.precision || 2,
      separator: this.props.separator || ',',
      delimiter: this.props.delimiter || '.',
      unit: this.props.unit,
      suffixUnit: this.props.suffixUnit,
      zeroCents: this.props.zeroCents || false
    });
  }

  render() {
    return (
      <Input {...this.props} ref="input"></Input>
    )
  }
}

export default MaskedMoneyInput;