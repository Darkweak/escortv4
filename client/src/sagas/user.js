import {all, takeEvery} from 'redux-saga/effects';
import {
  ACTIVATE_USER_REQUEST,
  RETRIEVE_PROFILE_FAILED,
  RETRIEVE_PROFILE_REQUEST,
  RETRIEVE_PROFILE_SUCCESS
} from "../components/User/store/action";
import {commonRequest} from "./common";
import {
  APPLY_REINITIALIZE_PASSWORD_FAILED,
  APPLY_REINITIALIZE_PASSWORD_REQUEST,
  APPLY_REINITIALIZE_PASSWORD_SUCCESS,
  REINITIALIZE_PASSWORD_FAILED,
  REINITIALIZE_PASSWORD_REQUEST,
  REINITIALIZE_PASSWORD_SUCCESS
} from "../components/ForgotPassword/store/action";

function* handleUser(action) {
  const {payload, type} = action;
  switch (type) {
    case RETRIEVE_PROFILE_REQUEST:
      yield commonRequest({
        pathname: '/profile',
        method: 'GET',
        callback_events: {
          success: RETRIEVE_PROFILE_SUCCESS,
          error: RETRIEVE_PROFILE_FAILED,
        },
        body: payload,
      });
      break;
    case ACTIVATE_USER_REQUEST:
      yield commonRequest({
        pathname: '/activate',
        method: 'POST',
        body: payload,
      });
      break;
    case APPLY_REINITIALIZE_PASSWORD_REQUEST:
      yield commonRequest({
        pathname: '/apply-reset-password',
        method: 'POST',
        callback_events: {
          success: APPLY_REINITIALIZE_PASSWORD_SUCCESS,
          error: APPLY_REINITIALIZE_PASSWORD_FAILED,
        },
        body: payload,
      });
      break;
    case REINITIALIZE_PASSWORD_REQUEST:
      yield commonRequest({
        pathname: `/reset-password/${payload.token}`,
        method: 'POST',
        callback_events: {
          success: REINITIALIZE_PASSWORD_SUCCESS,
          error: REINITIALIZE_PASSWORD_FAILED,
        },
        body: payload[0],
      });
      break;
    default:
      break;
  }
}

export default function* watchUser() {
  yield all([takeEvery(RETRIEVE_PROFILE_REQUEST, handleUser)]);
  yield all([takeEvery(ACTIVATE_USER_REQUEST, handleUser)]);
  yield all([takeEvery(APPLY_REINITIALIZE_PASSWORD_REQUEST, handleUser)]);
  yield all([takeEvery(REINITIALIZE_PASSWORD_REQUEST, handleUser)]);
}
