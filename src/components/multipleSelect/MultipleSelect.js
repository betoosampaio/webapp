import React, { Component } from 'react';
import $ from 'jquery/dist/jquery';
import 'multiple-select/dist/multiple-select';
import 'multiple-select/dist/multiple-select.min.css';
import 'multiple-select/dist/themes/bootstrap.min.css';


class MultipleSelect extends Component {

  componentDidMount() {
    $(`#${this.props.id || "multiple-select"}`)
      .multipleSelect({ ...this.props.options, onClose: this.onClose })
  }

  componentDidUpdate() {
    $(`#${this.props.id || "multiple-select"}`).multipleSelect('refresh');
  }

  onClose = () => {
    let name = this.props.name;
    let values = $(`#${this.props.id || "multiple-select"}`).multipleSelect('getSelects');
    
    this.props.onChange({
      target: {
        name: name,
        value: values
      }
    });
  }

  render() {
    return (
      <select id="multiple-select" className="form-control" {...this.props}>
      </select>
    );
  }
}

export default MultipleSelect;