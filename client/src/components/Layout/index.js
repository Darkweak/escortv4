import React, {Fragment} from 'react';
import {Navbar} from "./Navbar";
import {Footer} from "./Footer";
import {Container} from 'reactstrap';
import {ReturnToTop} from "../Top";
import './css/main.css';

export const Layout = ({children, defaultContainer, padding, reverse, ...rest}) => (
  <Fragment>
    <Navbar {...rest}/>
    <div className={'body-container'}>
      {
        defaultContainer ?
          padding ?
          <Container>
            <div className={'pt-4 pb-4'}>
              {children}
            </div>
          </Container> :
          <Container>
            {children}
          </Container> :
          padding ?
            <div className={`pt-4 pb-4 ${reverse && 'children'}`}>
              {children}
            </div> :
            children
      }
    </div>
    <ReturnToTop/>
    <Footer {...rest}/>
  </Fragment>
);
