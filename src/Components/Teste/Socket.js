import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card, ListGroup, Tab, Tabs, Alert } from 'react-bootstrap'
import socketIOClient from "socket.io-client";

class Socket extends React.Component {

    constructor() {
        super();
        this.state = {
            host: "localhost:3002",
            opt: { opt1: "opt1" },
            listen: ["listen1", "listen2"],
            emit: ["emit1", "emit2"],
            history: [],
            emitBody: {
                "emit1": "{'emit1': 'emit1'}",
                "emit2": "{'emit2': 'emit2'}"
            }
        };
    }

    componentDidMount() {
        //this.socket = socketIOClient(this.state.host, this.state.opt);
        //this.socket.on("atualizacao", (dados) => {
        //    this.setState({ restaurante: dados });
        //})
        //this.socket.emit("mesa/cadastrar", { n: this.state.formulario.n_mesa });
    }

    formChange = (event) => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[event.target.name] = event.target.value;
        this.setState({ formulario: formNewState });
    }

    render() {
        return (
            <Container>
                <Row style={{ marginTop: 10 }}>
                    <Col xs={12}>
                        <InputGroup>
                            <Form.Control aria-describedby="basic-addon1" placeholder="http://localhost:80" />
                            <Form.Control aria-describedby="basic-addon1" placeholder="{token: 'token'}" />
                            <InputGroup.Append>
                                <Button variant="outline-success">Conectar</Button>
                                <Button variant="outline-danger">Desconectar</Button>
                                <InputGroup.Text>Conectado</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col xs={3}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Eventos</Card.Title>
                                <Tabs defaultActiveKey="listen">
                                    <Tab eventKey="listen" title="Listen">
                                        <br></br>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Listen 1</ListGroup.Item>
                                            <ListGroup.Item>Listen 2</ListGroup.Item>
                                            <ListGroup.Item>Listen 3</ListGroup.Item>
                                        </ListGroup>
                                    </Tab>
                                    <Tab eventKey="emit" title="Emit">
                                        <br></br>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Emit 1</ListGroup.Item>
                                            <ListGroup.Item>Emit 2</ListGroup.Item>
                                        </ListGroup>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={5}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Histórico
                                    <Button variant="secondary" size="sm" className="float-right">Limpar</Button>
                                </Card.Title>
                                
                                <br></br>

                                <Card bg="light">
                                    <Card.Header>[22:05] Liten 2</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                                <br></br>

                                <Card bg="light">
                                    <Card.Header>[22:00] Liten 1</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Emitir</Card.Title>
                                <InputGroup>
                                    <InputGroup.Append>
                                        <Form.Control aria-describedby="basic-addon1" placeholder="Evento" />
                                        <Button variant="outline-secondary">Enviar</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <br></br>
                                <textarea></textarea>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Socket;
