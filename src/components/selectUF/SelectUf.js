import React, { Component } from 'react';
import { Input } from 'reactstrap';

class SelectUF extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lista: [
                'AC',
                'AL',
                'AM',
                'AP',
                'BA',
                'CE',
                'DF',
                'ES',
                'GO',
                'MA',
                'MG',
                'MS',
                'MT',
                'PA',
                'PB',
                'PE',
                'PI',
                'PR',
                'RJ',
                'RN',
                'RO',
                'RR',
                'RS',
                'SC',
                'SE',
                'SP',
                'TO',
            ],
        };
    }

    render() {
        return (
            <Input type="select" {...this.props}>
                <option value="">Selecione</option>
                {
                    this.state.lista.map(obj => {
                        return (
                            <option key={obj} value={obj}>{obj}</option>
                        )
                    })
                }
            </Input>
        )
    }
}

export default SelectUF;