import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';

class SelectUF extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lista: [],
        };
    }

    componentDidMount() {
        this.obterDados();
    }

    obterDados = async () => {
        let dados = await serverRequest.request('/restaurante/obterVariaveisCadastro');
        if (dados) {
            this.setState({ lista: dados[2] });
        }
    }

    render() {
        return (
            <Input type="select" {...this.props}>
                <option value="">Selecione</option>
                {
                    this.state.lista.map(obj => {
                        return (
                            <option key={obj.uf} value={obj.uf}>{obj.uf}</option>
                        )
                    })
                }
            </Input>
        )
    }
}

export default SelectUF;