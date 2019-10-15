import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'


class EditarMenu extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong>Editar Menu</strong>
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

                        <FormGroup>
                            <Label>Ativo:</Label>
                            <InputGroup>
                                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} checked />
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

export default EditarMenu;
