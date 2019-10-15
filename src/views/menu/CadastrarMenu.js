import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

class CadastrarMenu extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong>Cadastrar Menu</strong>
                    </CardHeader>
                    <CardBody>

                        <FormGroup>
                            <Label>Descrição:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup>
                        </FormGroup>

                    </CardBody>
                    <CardFooter>
                        <Button className="pull-right" color="success"><i className="fa fa-check"></i> Confirmar</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default CadastrarMenu;
