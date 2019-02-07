import * as actions from './action';
import {resetForm} from "../../../functions/serialize";

const initialState = {
  outing_created: false,
  outing_creation_error: false,
  outing_creation_error_cause: [],
  outing_created_elements: [],
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
      let elements = state.outing_created_elements;
      elements.push(payload);
      resetForm('escort-outing');
      return {
        ...state,
        outing_created: true,
        outing_creation_error: false,
        outing_creation_error_cause: [],
        outing_created_elements: [...elements],
      };
    default:
      return state;
  }
};
