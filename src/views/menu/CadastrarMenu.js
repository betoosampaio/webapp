import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';


class CadastrarMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ds_menu: "",

        };
    }


    cadastrar = async (event) => {
        event.preventDefault();
        let dados = await serverRequest.request('/menu/cadastrar', this.state);
        if (dados) {
            window.location.href = '#/menu';
        }
    }

    changeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            
                <form name="form" onSubmit={this.cadastrar}>
                    <Card>
                        <CardHeader>
                            <strong>Cadastrar Menu</strong>
                        </CardHeader>
                        <CardBody>

                            <FormGroup>
                                <Label>Nome do menu:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="ds_menu" value={this.state.ds_menu} onChange={this.changeInput} required minLength="4" />
                                </InputGroup>
                            </FormGroup>

                        </CardBody>
                        <CardFooter>
                        <Button type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> Confirmar</Button>
                        </CardFooter>
                    </Card>
                </form>
            
        );
    }
}

export default CadastrarMenu;
