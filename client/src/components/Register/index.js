import React from 'react';
import {Form} from "../Form";
import {Layout} from "../Layout";
import {Col} from 'reactstrap';
import {registerUser} from "./store/action";
import {connect} from 'react-redux';
import {DangerAlert, SuccessAlert} from "../Alerts";
import {compose, lifecycle} from 'recompose';
import {redirectTo} from "../../functions/redirect";

const fields = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'john@doe.com',
    name: 'email',
  },
  {
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Mot de passe',
    name: 'password',
  },
  {
    label: 'Nom d\'utilisateur',
    type: 'text',
    placeholder: 'jhondoe',
    name: 'username',
  }
];

const mapStateToProps = ({
                           loginReducer: {
                             logged
                           },
                           registerReducer: {
                             registered,
                             register_error,
                             register_error_cause
                           }
}) => ({
  logged,
  registered,
  register_error,
  register_error_cause,
});

export const Register = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      registerUser: (...args) => dispatch(registerUser(...args))
    })
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.logged) {
        redirectTo(this.props.history, '/')
      }
    }
  })
)(({registered, register_error, register_error_cause, registerUser, ...rest}) => (
  <Layout defaultContainer {...rest}>
    <Col md={{offset: 2, size: 8}}>
      <div className={'pt-4 pb-4'}>
        {
          register_error && register_error_cause && register_error_cause.length ?
            register_error_cause.map(cause => <DangerAlert content={cause.message}/>) : null
        }
        {
          registered ? <SuccessAlert content={'Votre compte a bien été créé, un email vient de vous être envoyé'}/> : null
        }
        <Form
          handleSubmit={(...args) => registerUser(...args)}
          identifier={'escort-register'}
          fields={fields}
          redirect={{label: 'Déjà un compte ?', to: 'login'}}
          {...rest}
        />
      </div>
    </Col>
  </Layout>
));
