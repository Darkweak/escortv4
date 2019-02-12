import React, {Fragment} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import {transformDate} from "../../functions/date";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {redirectTo} from "../../functions/redirect";
import {compose, lifecycle, withHandlers, withState} from 'recompose';
import {OutingForm} from "./Form";
import '../Layout/css/main.css';
import {DangerAlert, InfoAlert, WarningAlert} from "../Alerts";
import {getOutingsList} from "../Welcome/store/action";
import {connect} from "react-redux";

const mapStateToProps = ({
  outingsListReducer: {
    fetch_outings_error,
    is_fetching_outings,
    outings_list,
  },
  outingReducer: {
    outing_created_elements
  }
}) => ({
  fetch_outings_error,
  is_fetching_outings,
  outing_created_elements,
  outings_list,
});

export const OutingList = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      getOutingsList: () => dispatch(getOutingsList())
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getOutingsList();
    }
  }),
  withState('toggled', 'setToggle', false),
  withHandlers({
    toggle: ({setToggle, toggled}) => () => setToggle(!toggled)
  })
)(({fetch_outings_error, history, is_fetching_outings, outing_created_elements, outings_list, toggle, toggled, setToggle, ...rest}) => (
  <Fragment>
    <Row className={'m-0 pt-3 pb-3'}>
      <Button className={'primary white-text'} onClick={toggle}>
        <FontAwesomeIcon icon="plus"/> Proposer une sortie
      </Button>
    </Row>
    <Modal isOpen={toggled} toggle={toggle}>
      <ModalHeader toggle={toggle} className={'reverse'}>Proposer une nouvelle sortie</ModalHeader>
      <ModalBody>
        <OutingForm history={history} {...rest}/>
      </ModalBody>
    </Modal>
    {
      is_fetching_outings ?
        <InfoAlert content={'Récupération des sorties en cours...'}/> :
        fetch_outings_error ?
          <DangerAlert content={'Erreur lors de la récupération des sorties...'}/> :
          !outings_list.length && !outing_created_elements.length &&
          <WarningAlert content={'Aucune sortie créée, soyez le premier à en créer une !'}/>
    }
    <Row>
      {
        outings_list && outings_list.length ?
          [...outing_created_elements.reverse(), ...outings_list].map((item, index) => (
            <Col key={index} xs={12} md={6} className={'p-1'}>
              <Card key={index} className={'b-secondary'}>
                <CardHeader className={'text-center secondary text-white'}>{item.name}</CardHeader>
                <CardHeader className={'text-center reverse'}>créé par {item.owner.username}</CardHeader>
                <CardBody>
                  <Row className={'justify-content-between ml-0 mr-0 mt-1 mb-1'}>
                    <div className={'d-flex'}>
                      <CardText><FontAwesomeIcon icon="map-marker-alt" />{` ${item.street}`}</CardText>
                    </div>
                    <div>
                      <CardText>{`${item.postcode} ${item.city}`}</CardText>
                    </div>
                  </Row>
                  <CardText><FontAwesomeIcon icon="calendar-alt" />{` ${transformDate(item.date)}`}</CardText>
                  <div className={'text-center'}>
                    <Button className={'primary white-text'} onClick={() => redirectTo(history, `${item['@id']}`)}>
                      <FontAwesomeIcon icon="eye" /> Voir l'annonce
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )) : null
      }
    </Row>
  </Fragment>
));
