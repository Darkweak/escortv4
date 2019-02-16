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
import {DangerAlert, WarningAlert} from "../Alerts";
import {getOutingsList} from "../Welcome/store/action";
import {connect} from "react-redux";
import {InputWithDelay} from "../InputWithDelay";
import {TextTruncate} from "../Layout/TextContainer";
import {Fetching} from "../Layout/Loader";

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
    <div className={'pt-1 pb-2'}>
      <InputWithDelay className={'w-100'}/>
    </div>
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
        <Fetching content={'des sorties'}/> :
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
                <CardHeader className={'text-center secondary text-white'}><TextTruncate maxSize={35} unDeploy content={item.name}/></CardHeader>
                <CardHeader className={'text-center secondary card-header-secondary text-white'}>créé par {item.owner.username}</CardHeader>
                <CardBody>
                  <div className={'bg-outing'}></div>
                  <CardText className={'text-center mt-1 mb-1'}><FontAwesomeIcon icon="map-marker-alt" />{` ${item.street}`}</CardText>
                  <CardText className={'text-center'}><FontAwesomeIcon icon="calendar-alt" />{` ${transformDate(item.date)}`}</CardText>
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
