import React, {Fragment} from 'react';
import {compose, lifecycle, withHandlers, withState} from 'recompose';
import '../Layout/css/main.css';
import {applyToParticipate, retrieveOuting} from "./store/action";
import {connect} from "react-redux";
import {Layout} from "../Layout";
import {TextContainer} from "../Layout/TextContainer";
import {DangerAlert, InfoAlert} from "../Alerts";
import {
  Button,
  Col,
  Container,
  Row
} from 'reactstrap';
import {transformDate} from "../../functions/date";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ShowMap} from "../Map";
import {getUsername} from "../../functions/logged";
import {isAlreadyParticipate} from "../../functions/participate";

const mapStateToProps = ({
  formReducer: {
    is_fetching
  },
  outingReducer: {
    outing,
    is_fetching_outing,
    outing_fetch_error,
  }
}) => ({
  is_fetching,
  outing,
  is_fetching_outing,
  outing_fetch_error,
});

const generateTableParticipants = (list) => {
  let participants = [];
  list.length && list.map(item => participants.push(getUsername() === item.participateBy.username ? 'Vous' : item.participateBy.username));
  return participants;
};

export const OutingShow = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      applyToParticipate: (...args) => dispatch(applyToParticipate(...args)),
      retrieveOuting: (...args) => dispatch(retrieveOuting(...args)),
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.retrieveOuting(this.props.match.params.id);
    }
  })
)(({applyToParticipate, is_fetching, is_fetching_outing, match: {params}, outing, outing_fetch_error, ...rest}) => (
  <Layout {...rest}>
    {
      is_fetching_outing ?
        <Container className={'pt-4 pb-4'}>
          <InfoAlert content={'Chargement de la sortie sélectionnée'}/>
        </Container> :
        outing ?
          <Fragment>
            <TextContainer className={'bg-title_outing'} content={{title: outing.name}}/>
            <Container className={'fs-140 pt-2 pb-2'}>
              <Row>
                <Col xs={{size: 12, order: 2}} md={{size: 8, order: 1}}>
                  <p>
                    <FontAwesomeIcon icon="map-marker-alt" />{` ${outing.street}`}
                  </p>
                  {
                    outing.complementaryStreet &&
                    <p>
                      <FontAwesomeIcon icon="map-marker-alt" />{` ${outing.complementaryStreet}`}
                    </p>
                  }
                  {
                    outing.description &&
                    <div className={'pt-3 pb-3'}>
                      <span><FontAwesomeIcon icon="file-alt" /> Ils participent aussi :</span>
                      <Container>
                        <Row>
                          {generateTableParticipants(outing.participants).map((item, index) => <Col xs={12} md={6} key={index}>{item}</Col>)}
                        </Row>
                      </Container>
                    </div>
                  }
                  <div className={'pt-3 pb-3'}>
                    <span><FontAwesomeIcon icon="users" /> Ils participent aussi :</span>
                    <Container>
                      <Row>
                        {generateTableParticipants(outing.participants).map((item, index) => <Col xs={12} md={6} key={index}>{item}</Col>)}
                      </Row>
                    </Container>
                  </div>
                </Col>
                <Col xs={{size: 12, order: 1}} md={{size: 4, order: 2}}>
                  <p>
                    <FontAwesomeIcon icon="user" /> Sortie créée par {outing.owner.username}
                  </p>
                  <p>
                    <FontAwesomeIcon icon="user-clock" /> Le {transformDate(outing.created)}
                  </p>
                  <p>
                    <FontAwesomeIcon icon="users" /> {outing.nbParticipants} participants
                  </p>
                  <div className={'pt-2 pb-2 text-center'}>
                    <Button
                      className={'primary'}
                      disabled={is_fetching}
                      onClick={() => applyToParticipate({outing: params.id, value: true})}>
                      <h3>{isAlreadyParticipate(generateTableParticipants(outing.participants)) ? `Je n'y vais plus` : `J'y participe`}</h3>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
            <ShowMap outing={{position: outing.position}}/>
          </Fragment> :
          <Container className={'pt-4 pb-4'}>
            <DangerAlert content={'La sortie sélectionnée n\'existe pas !'}/>
          </Container>
    }
  </Layout>
));
