import React from 'react';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';
import {redirectTo} from "../../functions/redirect";

const contents = [
  {
    position: {
      xs: 2,
      md: 1,
    },
    text: `Développé par @Darkweak_dev`,
    redirect: 'https://twitter.com/darkweak_dev',
  },
  {
    position: {
      xs: 1,
      md: 2,
    },
    text: `© eScort-me - ${(new Date()).getFullYear()}`,
  },
  {
    position: {
      xs: 3,
      md: 3,
    },
    text: `CGU`,
    innerRedirect: true,
    redirect: '/cgu'
  },
];

export const Footer = ({history}) => (
  <footer className="footer primary">
    <Container>
      <Row>
        {
          contents.map((content, index) => (
            <Col key={index} xs={{ size: 12, order: content.position.xs}} md={{ size: 4, order: content.position.md}} className={'footer-content'}>
              <span className={'nav-item'} onClick={() => content.innerRedirect ? redirectTo(history, content.redirect) : window.location.href = content.redirect}>{content.text}</span>
            </Col>
          ))
        }
      </Row>
    </Container>
  </footer>
);
