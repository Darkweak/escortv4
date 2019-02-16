import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import {activateUser} from "./store/action";
import {Layout} from "../Layout";
import {InfoAlert} from "../Alerts";
import {redirectTo} from "../../functions/redirect";

const mapStatetoProps = ({
  formReducer: {
    is_fetching
  }
}) => ({
  is_fetching
});

export const Activate = compose(
  connect(
    mapStatetoProps,
    dispatch => ({
      activateUser: (...args) => dispatch(activateUser(...args)),
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.activateUser({token: this.props.match.params.id});
      setTimeout(() => redirectTo(this.props.history, '/'), 3000)
    }
  }),
)(({...rest}) => (
  <Layout defaultContainer {...rest}>
    <div className={'pt-4 pb-4'}>
      <InfoAlert content={`Si le lien d'activation est valide votre compte sera activé puis vous serez redirigé vers l'accueil`}/>
    </div>
  </Layout>
));
