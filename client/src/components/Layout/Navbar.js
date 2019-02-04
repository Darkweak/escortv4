import React from 'react';
import {
  Collapse,
  Container,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar as BNavbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';
import {withHandlers, withState, compose} from 'recompose';
import './css/main.css';
import {NavItem} from "./NavItem";
import {LoginForm} from "../Login/Form";
import {isLogged} from "../../functions/logged";

export const Navbar = compose(
  withState('toggled', 'setToggle', false),
  withHandlers({
    toggle: ({setToggle, toggled}) => () => setToggle(!toggled),
  }),
)(({toggle, toggled, ...rest}) => (
  <BNavbar dark expand="md" className={'primary'}>
    <Container>
      <NavbarBrand href="/">eScort-me</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={toggled} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem text={`Accueil`} pathName={`/`} {...rest}/>
          {
            isLogged() ?
              <NavItem text={`Mon compte`} pathName={`/account`} {...rest}/> :
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Connexion
                </DropdownToggle>
                <DropdownMenu right>
                  <LoginForm {...rest}/>
                </DropdownMenu>
              </UncontrolledDropdown>
          }
        </Nav>
      </Collapse>
    </Container>
  </BNavbar>
));
