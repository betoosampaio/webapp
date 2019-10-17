import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem  } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';


const MeuPerfil = (props) => {
  return (
    <ListGroup>
      <ListGroupItem>Dados do usuário:</ListGroupItem>
      <ListGroupItem>Dados do restaurante:</ListGroupItem>
      <ListGroupItem>Dados bancários:</ListGroupItem>
    </ListGroup>
  );


}

export default MeuPerfil;