import React, {Fragment} from 'react';
import {Container} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {compose, lifecycle, withState} from 'recompose';
import './css/truncate.css';
import {redirectTo} from "../../functions/redirect";

export const TextContainer = ({content, history, reverse, className}) => (
  <div className={`pt-5 pb-5 ${!reverse ? 'primary-container' : 'reverse'} ${className}`}>
    <Container>
      {content.icon && <h1 className={'text-center fs-600'}><FontAwesomeIcon icon={content.icon} /></h1>}
      <h1 className={'text-center pb-2'}>{content.title}</h1>
      {content.description && <h3 className={'text-justify font-weight-light'}>{content.description} {content.learnMore && <span className={'redirect text-oblique'} onClick={() => redirectTo(history, content.learnMore)}>En savoir plus...</span>}</h3>}
    </Container>
  </div>
);

export const TextTruncate = compose(
  withState('truncatedText', 'setTruncatedText', ''),
  withState('truncated', 'setTruncated', true),
  lifecycle({
    componentDidMount() {
      this.props.setTruncatedText(this.props.content.substring(0, this.props.maxSize || 50));
    }
  }),
)(({content, setTruncated, setTruncatedText, truncated, truncatedText, unDeploy}) => (
  <span>
    {
      content.length > truncatedText.length ?
        <Fragment>
          {
            truncated ?
              `${truncatedText}...` :
              content
          }
          {
            !unDeploy &&
              <span className={'color-primary truncate-more-less'} onClick={() => setTruncated(!truncated)}>
                {
                  truncated ? ' Voir plus' : ' Voir moins'
                }
              </span>
          }
        </Fragment> :
        content
    }
  </span>
));
