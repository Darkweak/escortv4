import React from 'react';
import {Layout} from "../Layout";
import {connect} from 'react-redux';
import {applyReinitializePassword, reinitializePassword} from "./store/action";
import {DangerAlert, SuccessAlert} from "../Alerts";
import {Form} from "../Form";
import {Col} from 'reactstrap';

const fieldsApplyReset = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'john@doe.com',
  },
];

const fieldsReset = [
  {
    label: 'Nouveau mot de passe',
    type: 'password',
    placeholder: 'Mot de passe',
    name: 'password'
  },
];

const mapStateToPropsForgotPassword = ({forgotPasswordReducer: {
  forgot_password_error,
  forgot_password_success
}}) => ({
  forgot_password_error,
  forgot_password_success,
});

const mapStateToPropsResettPassword = ({forgotPasswordReducer: {
  reset_password_error,
  reset_password_success
}}) => ({
  reset_password_error,
  reset_password_success
});

export const ForgotPassword = connect(
  mapStateToPropsForgotPassword,
  dispatch => ({
    applyReinitializePassword: (...args) => dispatch(applyReinitializePassword(...args))
  })
)(({applyReinitializePassword, forgot_password_error, forgot_password_success, ...rest}) => (
  <Layout defaultContainer {...rest}>
    <Col md={{offset: 2, size: 8}} className={'pt-4 pb-4'}>
      {
        forgot_password_error ?
          <DangerAlert content={'Erreur, nous ne pouvons pas réinitialiser votre mot de passe pour le moment, réessayez plus tard'}/> :
          forgot_password_success && (
            <SuccessAlert content={'Si votre compte existe vous recevrez un email pour réinitialiser votre mot de passe'}/>
          )
      }
      <Form
        handleSubmit={(...args) => applyReinitializePassword(...args)}
        identifier={'escort-apply-reset-password'}
        fields={fieldsApplyReset}
        {...rest}
      />
    </Col>
  </Layout>
));

export const ResetPassword = connect(
  mapStateToPropsResettPassword,
  dispatch => ({
    reinitializePassword: (...args) => dispatch(reinitializePassword(...args))
  })
)(({reinitializePassword, reset_password_error, reset_password_success, match: {params: {id}}, ...rest}) => (
  <Layout defaultContainer {...rest}>
    <Col md={{offset: 2, size: 8}} className={'pt-4 pb-4'}>
      {
        reset_password_error ?
          <DangerAlert content={'Erreur, nous ne pouvons pas réinitialiser votre mot de passe pour le moment, réessayez plus tard'}/> :
          reset_password_success && (
            <SuccessAlert content={'Votre mot de passe a bien été changé, veuillez vous connecter'}/>
          )
      }
      <Form
        handleSubmit={(...args) => reinitializePassword({token: id, ...args})}
        identifier={'escort-reset-password'}
        fields={fieldsReset}
        {...rest}
      />
    </Col>
  </Layout>
));
