import * as actions from './action';

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
    default:
      return state;
  }
};
