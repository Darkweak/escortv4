import React, {Fragment} from 'react';
import {Spinner} from 'reactstrap';
import {InfoAlert} from "../Alerts";
import './css/loader.css';

export const Loader = ({color = 'light', className}) => (
  <Spinner color={color} className={className}/>
);

export const Fetching = ({content}) => (
  <Fragment>
    <InfoAlert content={`Chargement ${content} en cours`}/>
    <div className={'pt-2 pb-2'}>
      <Loader className={'color-primary x5 d-block m-auto'}/>
    </div>
  </Fragment>
);
