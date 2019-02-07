import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {
  Collapse,
  Container,
  DropdownMenu,
  DropdownItem as BDropdownItem,
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
import {redirectTo} from "../../functions/redirect";
import {logout} from "../Login/store/action";

const DropdownItem = ({callback_function, history, text}) => (
  <BDropdownItem className={'redirect'} onClick={callback_function}>{text}</BDropdownItem>
);

const mapStateToProps = ({loginReducer: {logged}}) => ({
  logged,
});

export const Navbar = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      logout: () => dispatch(logout())
    })
  ),
  withState('toggled', 'setToggle', false),
  withHandlers({
    toggle: ({setToggle, toggled}) => () => setToggle(!toggled),
  }),
)(({logged, logout, toggle, toggled, ...rest}) => (
  <BNavbar dark expand="md" className={'primary'}>
    <Container>
      <NavbarBrand href="/">eScort-me</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={toggled} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem text={`Accueil`} pathName={`/`} {...rest}/>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {logged ? 'Mon compte' : 'Connexion'}
            </DropdownToggle>
            <DropdownMenu right>
              {
                logged ?
                  <Fragment>
                    <DropdownItem callback_function={() => redirectTo(rest.history, '/profile')} text={`Mon profil`} {...rest} />
                    <DropdownItem callback_function={() => logout()} text={`Déconnexion`} {...rest} />
                  </Fragment> :
                  <LoginForm {...rest}/>
              }
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Container>
  </BNavbar>
));
