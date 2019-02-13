import * as actions from './action';
import * as outings_around from '../../Outing/store/action'

const initialState = {
  fetch_outings_error: false,
  is_fetching_outings: false,
  outings_list: [],
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case actions.RETRIEVE_OUTINGS_LIST_FAILED:
      return {
        ...state,
        fetch_outings_error: true,
        is_fetching_outings: false,
      };
    case actions.RETRIEVE_OUTINGS_LIST_REQUEST:
      return {
        ...state,
        fetch_outings_error: false,
        is_fetching_outings: true,
      };
    case actions.RETRIEVE_OUTINGS_LIST_SUCCESS:
      return {
        ...state,
        outings_list: payload,
        fetch_outings_error: false,
        is_fetching_outings: false,
      };
    case outings_around.OUTING_FETCH_AROUND_FAILED:
      return {
        ...state,
        outings_list: [],
        fetch_outings_error: true,
        is_fetching_outings: false,
      };
    case outings_around.OUTING_FETCH_AROUND_REQUEST:
      return {
        ...state,
        outings_list: [],
        fetch_outings_error: false,
        is_fetching_outings: true,
      };
    case outings_around.OUTING_FETCH_AROUND_SUCCESS:
      return {
        ...state,
        outings_list: payload,
        fetch_outings_error: false,
        is_fetching_outings: false,
      };
    default:
      return state;
  }
};
