import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';

class SelectBanco extends Component {

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
            this.setState({ lista: dados[0] });
        }
    }

    render() {
        return (
            <Input type="select" {...this.props}>
                <option value="">Selecione</option>
                {
                    this.state.lista.map(obj => {
                        return (
                            <option key={obj.nome} value={obj.nome}>{obj.nome}</option>
                        )
                    })
                }
            </Input>
        )
    }
}

export default SelectBanco;