import React from 'react';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';

const contents = [
  {
    position: {
      xs: 2,
      md: 1,
    },
    text: `Développé par @Darkweak`,
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
  },
];

export const Footer = () => (
  <footer className="footer primary">
    <Container>
      <Row>
        {
          contents.map((content, index) => (
            <Col key={index} xs={{ size: 12, order: content.position.xs}} md={{ size: 4, order: content.position.md}} className={'footer-content'}>
              <span>{content.text}</span>
            </Col>
          ))
        }
      </Row>
    </Container>
  </footer>
);
