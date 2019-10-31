import React, { Component } from 'react';
import { Input } from 'reactstrap';
import vanilla from 'vanilla-masker';

class MaskedMoneyInput extends Component {

  onChange = (event) => {
    event.target.value = vanilla.toMoney(event.target.value, {
      precision: this.props.precision || 2,
      separator: this.props.separator || ',',
      delimiter: this.props.delimiter || '.',
      unit: this.props.unit,
      suffixUnit: this.props.suffixUnit,
      zeroCents: this.props.zeroCents || false
    })
    this.props.onChange(event);
  }

  render() {
    return (
      <Input {...this.props} onChange={this.onChange}></Input>
    )
  }
}

export default MaskedMoneyInput;