import React from 'react';
import {Container} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TextContainer = ({content, reverse}) => (
  <div className={`pt-5 pb-5 ${!reverse ? 'primary-container' : 'reverse'}`}>
    <Container>
      {content.icon && <h1 className={'text-center fs-600'}><FontAwesomeIcon icon={content.icon} /></h1>}
      <h1 className={'text-center pb-2'}>{content.title}</h1>
      <h3 className={'text-justify font-weight-light'}>{content.description}</h3>
    </Container>
  </div>
);
