import * as login from '../../Login/store/action';
import * as register from '../../Register/store/action';
import * as outing from '../../Outing/store/action';

const initialState = {
  is_fetching: false,
};

export default (state = initialState, {type}) => {
  switch (type) {
    case login.LOGIN_REQUEST:
      return {
        is_fetching: true,
      };
    case register.REGISTER_REQUEST:
      return {
        is_fetching: true,
      };
    case outing.OUTING_CREATE_REQUEST:
      return {
        is_fetching: true,
      };

    case login.LOGIN_FAILED:
      return {
        is_fetching: false,
      };
    case login.LOGIN_SUCCESS:
      return {
        is_fetching: false,
      };
    case register.REGISTER_FAILED:
      return {
        is_fetching: false,
      };
    case register.REGISTER_SUCCESS:
      return {
        is_fetching: false,
      };
    case outing.OUTING_CREATE_FAILED:
      return {
        is_fetching: false,
      };
    case outing.OUTING_CREATE_SUCCESS:
      return {
        is_fetching: false,
      };
    default:
      return state;
  }
};
