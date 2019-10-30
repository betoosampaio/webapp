import React, { Component } from 'react';
import serverRequest from '../utils/serverRequest';
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

  remover = (name) => {
    this.props.onChange({ target: { name: name, value: "" } });
    this.setState({ path: "" });
  }

  render() {
    const styleFileUpload = { border: "1px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer" }
    const name = this.props.name;
    return (
      <div>
        <label htmlFor="imgupload" style={styleFileUpload}>
          <i className="fa fa-cloud-upload"></i> Escolher Arquivo
        </label>
        <input {...this.props} id="imgupload" type="file" onChange={this.upload} style={{ display: "none" }} />
        <label style={styleFileUpload} onClick={() => { this.remover(name) }}>
          <i className="fa fa-remove"></i>
        </label>
        <br />
        {
          (this.state.path || this.props.path)
            ? <Foto src={this.state.path || this.props.path} alt=""></Foto>
            : <span />
        }
      </div>

    )
  }
}

export default UploadFoto;