import React, {Fragment} from 'react';
import {Navbar} from "./Navbar";
import {Footer} from "./Footer";
import {Container} from 'reactstrap';
import {ReturnToTop} from "../Top";
import './css/main.css';

export const Layout = ({children, defaultContainer, ...rest}) => (
  <Fragment>
    <Navbar {...rest}/>
    <div className={'body-container'}>
      {
        defaultContainer ?
          <Container>
            {children}
          </Container> :
          children
      }
    </div>
    <ReturnToTop/>
    <Footer/>
  </Fragment>
)
