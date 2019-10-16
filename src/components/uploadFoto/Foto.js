import React, { Component } from 'react';

class Foto extends Component {

  render() {
    return (   
        <img alt="" {...this.props} src={`${process.env.REACT_APP_SRV_PATH}/${this.props.src}`}></img>
    )
  }
}

export default Foto;