import React, { Component } from 'react';
import serverRequest from '../utils/serverRequest';
import AutoSuggest from './AutoSuggest';

class SuggestMunicipio extends Component {
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
        let dados = await serverRequest.request('/obterMunicipios');
        if (dados) {   
            this.setState({ lista: dados.map(m => m.municipio) });
        }
    }

    render() {
        return (
            <AutoSuggest id="autoSuggestMunicipio" {...this.props} autosuggestlist={this.state.lista}></AutoSuggest>
        );
    }
}

export default SuggestMunicipio;