import * as actions from './action';
import {isLogged, loginUser, logoutUser} from "../../../functions/logged";
import {resetForm} from "../../../functions/serialize";

const initialState = {
  logged: isLogged(),
  login_error: false,
};

const redirectToHome = () => window.location.pathname = '/';

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.LOGIN_REQUEST:
      logoutUser();
      return {
        ...state,
        login_error: false,
      };
    case actions.LOGIN_FAILED:
      logoutUser();
      return {
        ...state,
        logged: false,
        login_error: true,
      };
    case actions.LOGIN_SUCCESS:
      resetForm('escort-login');
      loginUser(payload.token);
      redirectToHome();
      break;
    case actions.LOGOUT:
      logoutUser();
      redirectToHome();
      break;
    default:
      return state;
  }
};
