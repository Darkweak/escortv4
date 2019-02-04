import * as actions from './action';
import {loginUser, logoutUser} from "../../../functions/logged";

const initialState = {
  logged: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.LOGIN_FAILED:
      logoutUser();
      return {
        ...state,
        logged: false,
      };
    case actions.LOGIN_SUCCESS:
      loginUser(payload);
      return {
        ...state,
        logged: true,
      };
    default:
      return state;
  }
};
