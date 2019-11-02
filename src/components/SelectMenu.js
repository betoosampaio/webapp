import React, { Component } from 'react';
import { Input } from 'reactstrap';
import serverRequest from '../utils/serverRequest';

class SelectMenu extends Component {

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
        let dados = await serverRequest.request('/menu/listar');
        if (dados) {
            this.setState({ lista: dados });
        }
    }

    render() {
        return (
            <Input type="select" {...this.props}>
                <option value="">Selecione</option>
                {
                    this.state.lista.filter(m => m.ativo).map(obj => {
                        return (
                            <option key={obj.id_menu} value={obj.id_menu}>{obj.ds_menu}</option>
                        )
                    })
                }
            </Input>
        )
    }
}

export default SelectMenu;