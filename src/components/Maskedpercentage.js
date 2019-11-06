import React, { Component } from 'react';
import { Input } from 'reactstrap';
import vanilla from 'vanilla-masker';

class Maskedpercentage extends Component {

  onChange = (event) => {
    event.target.value = vanilla.toMoney(event.target.value, {


      precision: this.props.precision || 1,
      
      delimiter: this.props.delimiter || '%',
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

export default Maskedpercentage;