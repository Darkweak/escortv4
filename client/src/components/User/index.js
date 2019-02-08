import React from 'react';
import {Layout} from "../Layout";
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import {getProfile} from "./store/action";
import {InfoAlert} from "../Alerts";

const mapStateToProps = ({
                           userReducer: {
                             profile
                           }
}) => ({
  profile
});

export const Profile = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      getProfile: () => dispatch(getProfile())
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getProfile();
    }
  })
)(({profile, ...rest}) => (
  <Layout defaultContainer {...rest}>
    {
      profile ?
        <div className={'pt-4 pb-4 b-ws'}>
          <h1 className={'text-center'}>Bienvenue sur votre profil {profile.username}</h1>
        </div> :
        <InfoAlert content={'Chargement de votre profil en cours'}/>
    }
  </Layout>
));
