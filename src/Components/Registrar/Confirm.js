import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  cadastrarRestaurante = e => {
    e.preventDefault();
    this.props.cadastrarRestaurante();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const {

      values: { cnpj, razao_social, cep, logradouro, numero, bairro, municipio, uf, complemento, celular, email, codigo_banco, id_tipo_cadastro_conta, id_tipo_conta, agencia, conta, digito, cpf_administrador, nome_administrador, codigo_restaurante, nome_restaurante, login, senha }

    } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Confirm User Data" />
          <form className='cadastrar'>
            <List>
              <h1>Seja muito bem vindo a familia FREED</h1>
              <ListItem primaryText="First Name" secondaryText={cnpj} />
              <ListItem primaryText="Last Name" secondaryText={razao_social} />
              <ListItem primaryText="Email Id" secondaryText={cep} />
              <ListItem primaryText="Occupation" secondaryText={logradouro} />
              <ListItem primaryText="City" secondaryText={numero} />
              <ListItem primaryText="Bio" secondaryText={bairro} />
            </List>
            <br />

            <RaisedButton
              label="Confirm & Continue"
              primary={true}
              style={styles.button}
              onClick={this.cadastrarRestaurante}
            />

            <RaisedButton
              label="Back"
              primary={false}
              style={styles.button}
              onClick={this.back}
            />
          </form>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
const styles = {
  button: {
    margin: 15
  }
};
export default FormUserDetails;
