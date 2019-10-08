import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card, ListGroup, Tab, Tabs, Badge } from 'react-bootstrap'
import socketIOClient from "socket.io-client";

class Socket extends React.Component {

    constructor() {
        super();
        this.state = {
            conectado: false,
            host: "http://localhost:3002",
            opt: '{ "token": "123" }',
            listen: ["atualizacao"],
            emit: ["mesa/cadastrar"],
            history: [],
            emitText: {
                'mesa/cadastrar': '{"n": "1"}',
            },
            addListen: "",
            addEmit: "",
            emitSelected: "",
            emitSelectedText: "",
        };
    }

    async componentDidMount() {
        await this.setState(JSON.parse(localStorage.getItem('socketConfig')));
        this.conectar();
    }

    componentDidUpdate() {
        localStorage.setItem('socketConfig', JSON.stringify(this.state));
    }

    conectar = () => {
        if (this.socket && this.socket.connected)
            this.socket.disconnect();

        let opt;
        try { opt = JSON.parse(this.state.opt) } catch{ }
        
        this.socket = socketIOClient(this.state.host, {query: opt});

        this.socket.on('connect', () => {
            this.setState({ conectado: this.socket.connected });
        });
        this.socket.on('disconnect', () => {
            this.setState({ conectado: this.socket.connected });
        });
        // adicionar listeners
        for (let eventName of this.state.listen) {
            this.socket.on(eventName, (dados) => {
                let h = new Date().toLocaleTimeString();
                let history = { header: `[${h}] ${eventName}`, body: JSON.stringify(dados) };
                this.setState({ history: [history, ...this.state.history] });
            });
        }
    }

    desconectar = () => {
        this.socket.disconnect();
    }

    emitir = () => {
        let data = JSON.parse(this.state.emitSelectedText);
        this.socket.emit(this.state.emitSelected, data);
    }

    limparHistorico = () => {
        this.setState({ history: [] });
    }

    adicionarListen = () => {
        this.setState({ listen: [...this.state.listen, this.state.addListen] });
    }

    removerListen = (listen) => {
        let filteredArray = this.state.listen.filter(item => item !== listen)
        this.setState({ listen: filteredArray });
    }

    adicionarEmit = () => {
        this.setState({ emit: [...this.state.emit, this.state.addEmit] });
    }

    removerEmit = (emit) => {
        let filteredArray = this.state.emit.filter(item => item !== emit)
        this.setState({ emit: filteredArray });
    }

    formChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    formChangeEmitSelectedText = (event) => {
        let emitText = Object.assign({}, this.state.emitText);
        emitText[this.state.emitSelected] = event.target.value;
        this.setState({ [event.target.name]: event.target.value, emitText: emitText });
    }

    handleKeyDown(event) {
        if (event.keyCode === 9) { // tab was pressed
            event.preventDefault();
            var val = this.state.emitSelectedText,
                start = event.target.selectionStart,
                end = event.target.selectionEnd;

            this.setState({ "emitSelectedText": val.substring(0, start) + '\t' + val.substring(end) }, () => this.refs.input.selectionStart = this.refs.input.selectionEnd = start + 1);
        }
    }

    render() {
        return (
            <Container style={{ maxWidth: "100%" }}>
                <Row style={{ marginTop: 10 }}>
                    <Col xs={12}>
                        <InputGroup>
                            <Form.Control
                                aria-describedby="basic-addon1"
                                placeholder="http://localhost:80"
                                name="host"
                                onChange={this.formChange}
                                value={this.state.host} />
                            <Form.Control
                                aria-describedby="basic-addon1"
                                placeholder="{token: 'token'}"
                                name="opt"
                                onChange={this.formChange}
                                value={this.state.opt} />
                            <InputGroup.Append>
                                <Button variant="outline-success" onClick={this.conectar}>Conectar</Button>
                                <Button variant="outline-danger" onClick={this.desconectar}>Desconectar</Button>
                                <InputGroup.Text>{this.state.conectado ? "Conectado" : "Desconectado"}</InputGroup.Text>
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
                                        <InputGroup.Append>
                                            <Form.Control
                                                aria-describedby="basic-addon1"
                                                placeholder="Evento Listen"
                                                name="addListen"
                                                onChange={this.formChange}
                                                value={this.state.addListen} />
                                            <Button
                                                variant="outline-secondary"
                                                onClick={this.adicionarListen}>Add</Button>
                                        </InputGroup.Append>
                                        <br></br>
                                        <ListGroup variant="flush">
                                            {
                                                this.state.listen.map(obj => {
                                                    return (
                                                        <ListGroup.Item>{obj}
                                                            <Badge
                                                                variant="light"
                                                                style={{ float: "right" }}
                                                                onClick={() => this.removerListen(obj)}>x</Badge>
                                                        </ListGroup.Item>
                                                    )
                                                })
                                            }
                                        </ListGroup>
                                    </Tab>
                                    <Tab eventKey="emit" title="Emit">
                                        <br></br>
                                        <InputGroup.Append>
                                            <Form.Control
                                                aria-describedby="basic-addon1"
                                                placeholder="Evento Emit"
                                                name="addEmit"
                                                onChange={this.formChange}
                                                value={this.state.addEmit} />
                                            <Button
                                                variant="outline-secondary"
                                                onClick={this.adicionarEmit}>Add</Button>
                                        </InputGroup.Append>
                                        <br></br>
                                        <ListGroup variant="flush">
                                            {
                                                this.state.emit.map(obj => {
                                                    return (
                                                        <ListGroup.Item onClick={() => this.setState({ emitSelected: obj, emitSelectedText: this.state.emitText[obj] })}>
                                                            {obj}
                                                            <Badge
                                                                variant="light"
                                                                style={{ float: "right" }}
                                                                onClick={() => this.removerEmit(obj)}>x</Badge>
                                                        </ListGroup.Item>
                                                    )
                                                })
                                            }
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
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="float-right"
                                        onClick={this.limparHistorico}>Limpar</Button>
                                </Card.Title>
                                {
                                    this.state.history.map(obj => {
                                        return (
                                            <div>
                                                <br></br>
                                                <Card bg="light">
                                                    <Card.Header>{obj.header}</Card.Header>
                                                    <Card.Body>{obj.body}</Card.Body>
                                                </Card>
                                            </div>
                                        )
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Emitir</Card.Title>
                                <InputGroup>
                                    <Col xs={12}>
                                        <InputGroup.Append>
                                            <Form.Control
                                                aria-describedby="basic-addon1"
                                                placeholder="Evento"
                                                name="emitSelected"
                                                onChange={this.formChange}
                                                value={this.state.emitSelected} />
                                            <Button variant="outline-secondary" onClick={this.emitir}>Enviar</Button>
                                        </InputGroup.Append>
                                        <br></br>
                                        <Form.Control
                                            as="textarea"
                                            rows="10"
                                            ref="input"
                                            name="emitSelectedText"
                                            onKeyDown={this.handleKeyDown.bind(this)}
                                            onChange={this.formChangeEmitSelectedText}
                                            value={this.state.emitSelectedText ? this.state.emitSelectedText : ""}>
                                        </Form.Control>
                                    </Col>
                                </InputGroup>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default Socket;
