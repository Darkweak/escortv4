import React from 'react';
import {compose, lifecycle} from 'recompose';
import {applyToParticipate, detectParticipate} from "../store/action";
import {connect} from "react-redux";
import {
  Button,
} from 'reactstrap';
import {Loader} from "../../Layout/Loader";

const mapStateToProps = ({
  outingReducer: {
    outing_participate,
    outing_participate_fetch,
  }
}) => ({
  outing_participate,
  outing_participate_fetch,
});

export const ButtonHandleParticipate = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      applyToParticipate: (...args) => dispatch(applyToParticipate(...args)),
      detectParticipate: (...args) => dispatch(detectParticipate(...args)),
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.detectParticipate(this.props.participate);
    }
  })
)(({applyToParticipate, id, outing_participate, outing_participate_fetch, ...rest}) => (
  <div className={'pt-2 pb-2 text-center'}>
    <Button
      className={'primary'}
      disabled={outing_participate_fetch}
      onClick={() => applyToParticipate({outing: id, value: !outing_participate})}>
      <h3>{outing_participate_fetch ? <Loader/> : outing_participate ? `Je n'y vais plus` : `J'y participe`}</h3>
    </Button>
  </div>
));
