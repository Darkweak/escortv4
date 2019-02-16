import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import {fetchAroundCity} from "../Outing/store/action";
import {getOutingsList} from "../Welcome/store/action";

const mapStatetoProps = ({
  formReducer: {
    is_fetching
  }
}) => ({
  is_fetching
});

let mytimeout;

export const InputWithDelay = compose(
  connect(
    mapStatetoProps,
    dispatch => ({
      fetchAroundCity: (...args) => dispatch(fetchAroundCity(...args)),
      getOutingsList: () => dispatch(getOutingsList()),
    })
  ),
  lifecycle({
    componentDidMount() {
      let input = document.getElementById('input-delayed');
      input.addEventListener('keyup', () => {
        clearTimeout(mytimeout);
        mytimeout = setTimeout(() => ('' === input.value) ? this.props.getOutingsList() : this.props.fetchAroundCity({position: input.value}), 1000);
      })
    }
  })
)(({...rest}) => (
  <input id={'input-delayed'} placeholder={'Rechercher une ville, Paris...'} {...rest}/>
));
