import * as login from '../../Login/store/action';
import * as register from '../../Register/store/action';
import * as outing from '../../Outing/store/action';
import * as user from '../../User/store/action';

const initialState = {
  is_fetching: false,
};

export default (state = initialState, {type}) => {
  switch (type) {
    case login.LOGIN_REQUEST:
    case register.REGISTER_REQUEST:
    case outing.OUTING_CREATE_REQUEST:
    case outing.OUTING_SHOW_REQUEST:
    case user.RETRIEVE_PROFILE_REQUEST:
      return {
        is_fetching: true,
      };

    case login.LOGIN_FAILED:
    case login.LOGIN_SUCCESS:
    case register.REGISTER_FAILED:
    case register.REGISTER_SUCCESS:
    case outing.OUTING_CREATE_FAILED:
    case outing.OUTING_CREATE_SUCCESS:
    case outing.OUTING_SHOW_FAILED:
    case outing.OUTING_SHOW_SUCCESS:
    case user.RETRIEVE_PROFILE_FAILED:
    case user.RETRIEVE_PROFILE_SUCCESS:
      return {
        is_fetching: false,
      };
    default:
      return state;
  }
};
