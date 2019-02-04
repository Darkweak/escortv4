import React from 'react';
import {Form} from "../Form";
import {loginUser} from "./store/action";
import {serializeForm} from "../../functions/serialize";
import {connect} from 'react-redux';

const fields = [
  {
    label: 'Email',
    type: 'text',
    placeholder: 'john@doe.com',
  },
  {
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Mot de passe',
  },
];

export const LoginForm = connect(
  null,
  dispatch => ({
    loginUser: (...args) => dispatch(loginUser(...args))
  })
)(({loginUser, ...rest}) => (
  <Form
    handleSubmit={(...args) => loginUser(serializeForm(...args))}
    identifier={'escort-login'}
    fields={fields}
    redirect={{label: 'Pas encore inscrit ?', to: 'register'}} {...rest}
  />
));
