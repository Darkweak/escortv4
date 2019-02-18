import React from 'react';
import {Layout} from "../Layout";
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import {getProfile} from "./store/action";
import {InfoAlert} from "../Alerts";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Layout/css/main.css';
import {redirectTo} from "../../functions/redirect";
import {TextTruncate} from "../Layout/TextContainer";
import {Fetching} from "../Layout/Loader";

const mapStateToProps = ({
                           userReducer: {
                             profile
                           }
}) => ({
  profile
});

const ProfileOuting = ({outing, history}) => (
  <Card>
    <CardBody className={'text-center'}>
      <CardText>
        <TextTruncate maxSize={33} unDeploy content={outing.name}/>
      </CardText>
      <Button className={'primary white-text'} onClick={() => redirectTo(history, outing['@id'])}>
        <FontAwesomeIcon icon="eye" /> Voir l'annonce
      </Button>
    </CardBody>
  </Card>
);

export const Profile = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      getProfile: () => dispatch(getProfile())
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getProfile();
    }
  })
)(({profile, ...rest}) => (
  <Layout padding defaultContainer {...rest}>
    {
      profile ?
        <div className={'b-ws'}>
          <h1 className={'text-center'}>Bienvenue sur votre profil {profile.username}</h1>
          <Row className={'pt-3 pb-3'}>
            <Col xs={12} md={6} className={'b-right-md'}>
              <p className={'text-center font-italic'}>Sorties créées</p>
              {
                (profile.outingsOwner && profile.outingsOwner.length) ?
                  profile.outingsOwner.map((outing, index) => (
                    <ProfileOuting key={index} outing={outing} {...rest}/>
                  )) :
                  <InfoAlert content={'Vous n\'avez créé aucune sortie'}/>
              }
            </Col>
            <Col xs={12} md={6} className={'b-left-md'}>
              <p className={'text-center font-italic'}>Participation aux sorties</p>
              {
                (profile.outingsParticipate && profile.outingsParticipate.length) ?
                  profile.outingsParticipate.map((outing, index) => (
                    <ProfileOuting key={index} outing={outing.participateTo} {...rest}/>
                  )) :
                  <InfoAlert content={'Vous n\'avez participé à aucune sortie'}/>
              }
            </Col>
          </Row>
        </div> :
        <Fetching content={'de votre profil'}/>
    }
  </Layout>
));
