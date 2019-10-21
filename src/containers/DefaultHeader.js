import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../assets/img/logo.png'
import logo2 from '../assets/img/logo2.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25 }}
          minimized={{ src: logo2, width: 30, height: 30 }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/gerenciar" className="nav-link" >Gerenciar</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="fa fa-cogs"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Conta</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Notificações<Badge color="success">5</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Mensagens</DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tarefas</DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comentários</DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Configuração</strong></DropdownItem>
             
              <DropdownItem><i className="fa fa-user"></i><a href="http://localhost:3000/#/perfil">Perfil</a> </DropdownItem>
             
              <DropdownItem><i className="fa fa-wrench"></i> Configurações</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Recebimento</DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projetos</DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Encerrar Conta</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
