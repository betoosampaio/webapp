import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Foto from './Foto';

class UploadFoto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: ""
    }
  }

  upload = async (event) => {
    let name = event.target.name;

    let form = new FormData();
    form.append('imagem', event.target.files[0]);

    let dados = await serverRequest.requestForm('/produto/uploadimg', form);

    this.props.onChange({ target: { name: name, value: dados } });
    this.setState({ path: dados });
    
  }

  render() {
    return (
      <div>
        <Input {...this.props} type="file" onChange={this.upload} style={{ color: "rgba(0,0,0,0)" }} />
        <br />
        {
          (this.state.path || this.props.path)
          ? <Foto src={this.state.path || this.props.path} alt=""></Foto>
          : <span/>
        }        
      </div>

    )
  }
}

export default UploadFoto;