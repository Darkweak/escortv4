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
import {compose, withHandlers, withState} from 'recompose';
import {OutingForm} from "./Form";
import '../Layout/css/main.css';

export const OutingList = compose(
  withState('toggled', 'setToggle', false),
  withHandlers({
    toggle: ({setToggle, toggled}) => () => setToggle(!toggled)
  })
)(({history, list, toggle, toggled, setToggle, ...rest}) => (
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
    <Row>
      {
        list && list.map((item, index) => (
          <Col key={index} xs={12} md={6} className={'p-1'}>
            <Card key={index} className={'b-secondary'}>
              <CardHeader className={'text-center secondary text-white'}>{item.name}</CardHeader>
              <CardHeader className={'text-center reverse'}>créé par {item.owner.username}</CardHeader>
              <CardBody>
                <Row className={'justify-content-between ml-0 mr-0 mt-1 mb-1'}>
                  <div className={'d-flex'}>
                    <CardText><FontAwesomeIcon icon="map-marker-alt" />{` ${item.numberStreet} ${item.street}`}</CardText>
                  </div>
                  <div>
                    <CardText>{item.city}</CardText>
                  </div>
                </Row>
                <CardText><FontAwesomeIcon icon="calendar-alt" />{` ${transformDate(item.date)}`}</CardText>
                <div className={'text-center'}>
                  <Button className={'primary white-text'} onClick={() => redirectTo(history, `/outing/${item.id}`)}><FontAwesomeIcon icon="eye" /> Voir l'annonce</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))
      }
    </Row>
  </Fragment>
));
