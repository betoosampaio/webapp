import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';

class SelectPerfil extends Component {

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
        let dados = await serverRequest.request('/perfil/listar');
        if (dados) {
            this.setState({ lista: dados });
        }
    }

    render() {
        return (
            <Input type="select" {...this.props}>
                <option value="">Selecione</option>
                {
                    this.state.lista.map(obj => {
                        return (
                            <option key={obj.id_perfil} value={obj.id_perfil}>{obj.tipo_perfil}</option>
                        )
                    })
                }
            </Input>
        )
    }
}

export default SelectPerfil;