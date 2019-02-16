import React, {Fragment} from 'react';
import {compose, lifecycle} from 'recompose';
import '../Layout/css/main.css';
import {retrieveOuting} from "./store/action";
import {connect} from "react-redux";
import {Layout} from "../Layout";
import {TextContainer, TextTruncate} from "../Layout/TextContainer";
import {DangerAlert, SuccessAlert, WarningAlert} from "../Alerts";
import {
  Col,
  Container,
  Row
} from 'reactstrap';
import {transformDate} from "../../functions/date";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ShowMap} from "../Map";
import {getUsername} from "../../functions/logged";
import {ButtonHandleParticipate} from "./HandleParticipate";
import {Fetching} from "../Layout/Loader";

const mapStateToProps = ({
  formReducer: {
    is_fetching
  },
  outingReducer: {
    outing,
    outing_participate,
    is_fetching_outing,
    outing_fetch_error,
  }
}) => ({
  is_fetching,
  outing,
  is_fetching_outing,
  outing_fetch_error,
  outing_participate,
});

const generateTableParticipants = (list) => {
  let participants = [];
  list.length && list.map(item => (getUsername() !== item.participateBy.username && participants.push(item.participateBy.username)));
  return participants;
};

const isParticipant = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (getUsername() === list[i].participateBy.username) {
      return true
    }
  }
  return false;
};

export const OutingShow = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      retrieveOuting: (...args) => dispatch(retrieveOuting(...args)),
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.retrieveOuting(this.props.match.params.id);
    }
  })
)(({is_fetching, is_fetching_outing, match: {params}, outing, outing_fetch_error, outing_participate, ...rest}) => (
  <Layout {...rest}>
    {
      is_fetching_outing ?
        <Container className={'pt-4 pb-4'}>
          <Fetching content={'de la sortie sélectionnée'}/>
        </Container> :
        outing ?
          <Fragment>
            <TextContainer className={'bg-title_outing'} content={{title: outing.name}}/>
            <Container className={'fs-140 pt-3 pb-3'}>
              {
                outing.description &&
                  <p>
                    <FontAwesomeIcon icon='file-alt'/> <TextTruncate maxSize={100} content={` ${outing.description}`}/>
                  </p>
              }
            </Container>
            <Container className={'fs-140 pt-3 pb-3'}>
              {
                outing_participate && <SuccessAlert content={'Vous participez à cette sortie'}/>
              }
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
                  <div className={'pt-3 pb-3'}>
                    <span><FontAwesomeIcon icon="users" /> Ils participent aussi :</span>
                    <Container>
                      <Row>
                        {
                          !outing_participate && generateTableParticipants(outing.participants).length === 0 ?
                            <WarningAlert content={'Aucun inscrit pour le moment'}/> :
                            <Fragment>
                              {
                                outing_participate && <Col xs={12} md={6}>Vous</Col>
                              }
                              {
                                generateTableParticipants(outing.participants).map((item, index) => <Col xs={12} md={6} key={index}>{item}</Col>)
                              }
                            </Fragment>
                        }
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
                    <FontAwesomeIcon icon="users" /> {generateTableParticipants(outing.participants).length + (outing_participate ? 1 : 0)} participants
                  </p>
                  <ButtonHandleParticipate participate={isParticipant(outing.participants)} id={params.id}/>
                </Col>
              </Row>
            </Container>
            <ShowMap outing={{position: [outing.lat, outing.long]}}/>
          </Fragment> :
          <Container className={'pt-4 pb-4'}>
            <DangerAlert content={'La sortie sélectionnée n\'existe pas !'}/>
          </Container>
    }
  </Layout>
));
