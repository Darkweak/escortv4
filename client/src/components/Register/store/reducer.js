import * as actions from './action';
import {resetForm} from "../../../functions/serialize";

const initialState = {
  registered: false,
  register_error: false,
  register_error_cause: [],
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case actions.REGISTER_FAILED:
      return {
        ...state,
        registered: false,
        register_error: true,
        register_error_cause: payload.violations,
      };
    case actions.REGISTER_REQUEST:
      return {
        ...state,
        register_error: false,
        register_error_cause: [],
      };
    case actions.REGISTER_SUCCESS:
      resetForm('escort-register');
      return {
        ...state,
        registered: true,
        register_error: false,
        register_error_cause: [],
      };
    default:
      return state;
  }
};
