import React from 'react';
import {
  Alert
} from 'reactstrap';

const BaseAlert = ({color, content}) => (
  <Alert color={color} className={'text-center'}>
    {content}
  </Alert>
);

const DangerAlert = ({content}) => (
  <BaseAlert color="danger" content={content}/>
);

const DarkAlert = ({content}) => (
  <BaseAlert color="dark" content={content}/>
);

const InfoAlert = ({content}) => (
  <BaseAlert color="info" content={content}/>
);

const LightAlert = ({content}) => (
  <BaseAlert color="light" content={content}/>
);

const PrimaryAlert = ({content}) => (
  <BaseAlert color="primary" content={content}/>
);

const SecondaryAlert = ({content}) => (
  <BaseAlert color="secondary" content={content}/>
);

const SuccessAlert = ({content}) => (
  <BaseAlert color="success" content={content}/>
);

const WarningAlert = ({content}) => (
  <BaseAlert color="warning" content={content}/>
);

export {
  DangerAlert,
  DarkAlert,
  InfoAlert,
  LightAlert,
  PrimaryAlert,
  SecondaryAlert,
  SuccessAlert,
  WarningAlert,
};
