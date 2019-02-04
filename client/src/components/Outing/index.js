import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Row,
} from 'reactstrap';
import {transformDate} from "../../functions/date";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {redirectTo} from "../../functions/redirect";

export const OutingList = ({history, list}) => (
  <Row>
    {
      list && list.map((item, index) => (
        <Col key={index} xs={12} md={6} className={'p-1'}>
          <Card key={index} className={'b-secondary'}>
            <CardHeader className={'text-center secondary text-white'}>{item.title}</CardHeader>
            <CardBody>
              <Row className={'justify-content-between ml-0 mr-0 mt-1 mb-1'}>
                <div className={'d-flex'}>
                  <CardText><FontAwesomeIcon icon="map-marker-alt" />{` ${item.place}`}</CardText>
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
);
