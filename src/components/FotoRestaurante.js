import React, { Component } from 'react';

class FotoRestaurante extends Component {

  render() {
    const path = this.props.src ? `${process.env.REACT_APP_SRV_PATH}/${this.props.src}` : `${process.env.REACT_APP_SRV_PATH}/public/imgrestaurante/noimg.jpg`;
    return (   
        <img alt="" {...this.props} src={path}></img>
    )
  }
}

export default FotoRestaurante;