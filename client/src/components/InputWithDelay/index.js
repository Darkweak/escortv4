import React from 'react';
import {connect} from 'react-redux';
import {fetchAroundCity} from "../Outing/store/action";
import {getOutingsList} from "../Welcome/store/action";

let mytimeout;

export const InputWithDelay = connect(
  null,
  dispatch => ({
    fetchAroundCity: (...args) => dispatch(fetchAroundCity(...args)),
    getOutingsList: () => dispatch(getOutingsList()),
  })
)(({fetchAroundCity, getOutingsList, ...rest}) => (
  <input
    id={'input-delayed'}
    placeholder={'Rechercher une ville, Paris...'}
    onChange={({target: {value}}) => {
      clearTimeout(mytimeout);
      mytimeout = setTimeout(() => ('' === value) ? getOutingsList() : fetchAroundCity({position: value}), 1000);
    }}
    {...rest}/>
));
