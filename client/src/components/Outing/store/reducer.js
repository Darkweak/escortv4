import * as actions from './action';

const initialState = {
  outing_created: false,
  outing_creation_error: false,
  outing_creation_error_cause: [],
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case actions.OUTING_CREATE_FAILED:
      return {
        ...state,
        outing_created: false,
        outing_creation_error: true,
        outing_creation_error_cause: payload.violations,
      };
    case actions.OUTING_CREATE_REQUEST:
      return {
        ...state,
        outing_creation_error: false,
        outing_creation_error_cause: [],
      };
    case actions.OUTING_CREATE_SUCCESS:
      return {
        ...state,
        registered: true,
        outing_creation_error: false,
        outing_creation_error_cause: [],
      };
    default:
      return state;
  }
};
