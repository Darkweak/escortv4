import React, {Fragment} from 'react';
import {Form} from "../Form";
import {loginUser} from "./store/action";
import {connect} from 'react-redux';
import {WarningAlert} from "../Alerts";

const fields = [
  {
    label: 'Nom d\'utilisateur',
    type: 'text',
    placeholder: 'johndoe',
    name: 'username',
  },
  {
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Mot de passe',
    name: 'password',
  },
];

const mapStateToProps = ({loginReducer: {login_error}}) => ({
  login_error,
});

export const LoginForm = connect(
  mapStateToProps,
  dispatch => ({
    loginUser: (...args) => dispatch(loginUser(...args))
  })
)(({login_error, loginUser, ...rest}) => (
  <Fragment>
    {
      login_error && (
        <WarningAlert content={'Nom d\'utilisateur ou mot de passe incorrect'}/>
      )
    }
    <Form
      handleSubmit={(...args) => loginUser(...args)}
      identifier={'escort-login'}
      fields={fields}
      redirect={{label: 'Pas encore inscrit ?', to: 'register'}} {...rest}
    />
  </Fragment>
));
