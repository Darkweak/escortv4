import * as actions from './action';
import {resetForm} from "../../../functions/serialize";

const initialState = {
  forgot_password_fetching: false,
  forgot_password_error: false,
  forgot_password_success: false,
  reset_password_fetching: false,
  reset_password_error: false,
  reset_password_success: false,
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case actions.APPLY_REINITIALIZE_PASSWORD_FAILED:
      return {
        ...state,
        forgot_password_fetching: false,
        forgot_password_error: true,
        forgot_password_success: false,
      };
    case actions.APPLY_REINITIALIZE_PASSWORD_REQUEST:
      return {
        ...state,
        forgot_password_fetching: true,
        forgot_password_error: false,
        forgot_password_success: false,
      };
    case actions.APPLY_REINITIALIZE_PASSWORD_SUCCESS:
      resetForm('escort-apply-reset-password');
      return {
        ...state,
        forgot_password_fetching: false,
        forgot_password_error: false,
        forgot_password_success: true,
      };
    case actions.REINITIALIZE_PASSWORD_FAILED:
      return {
        ...state,
        reset_password_fetching: false,
        reset_password_error: true,
        reset_password_success: false,
      };
    case actions.REINITIALIZE_PASSWORD_REQUEST:
      return {
        ...state,
        reset_password_fetching: true,
        reset_password_error: false,
        reset_password_success: false,
      };
    case actions.REINITIALIZE_PASSWORD_SUCCESS:
      resetForm('escort-reset-password');
      return {
        ...state,
        reset_password_fetching: false,
        reset_password_error: false,
        reset_password_success: true,
      };
    default:
      return state;
  }
};
