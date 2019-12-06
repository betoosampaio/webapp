import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../utils/serverRequest';

class SelectAmbiente extends Component {

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
        let dados = await serverRequest.request('/ambiente/listar');
        if (dados) {
            this.setState({ lista: dados });
        }
    }

    render() {
        return (
            <Input type="select" {...this.props}>
                <option value="0">Nenhum</option>
                {
                    this.state.lista.filter(m => m.ativo).map(obj => {
                        return (
                            <option key={obj.id_ambiente} value={obj.id_ambiente}>{obj.ds_ambiente}</option>
                        )
                    })
                }
            </Input>
        )
    }
}

export default SelectAmbiente;