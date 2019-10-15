import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import SelectMenu from '../../components/selectMenu/SelectMenu';


class CadastrarProduto extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong>Cadastrar Produto</strong>
                    </CardHeader>
                    <CardBody>

                        <FormGroup>
                            <Label>Nome do Produto:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-tag"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup>
                        </FormGroup>

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
                            <Label>Preço:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-money"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Menu:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-list-ul"></i></InputGroupText>
                                </InputGroupAddon>
                                <SelectMenu></SelectMenu>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Promoção:</Label>
                            <InputGroup>
                                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} checked />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Foto:</Label>
                            <Input type="file" name="file" id="exampleFile" />
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

export default CadastrarProduto;
