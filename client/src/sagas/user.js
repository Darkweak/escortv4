import {all, takeEvery} from 'redux-saga/effects';
import {
  ACTIVATE_USER_REQUEST,
  RETRIEVE_PROFILE_FAILED,
  RETRIEVE_PROFILE_REQUEST,
  RETRIEVE_PROFILE_SUCCESS
} from "../components/User/store/action";
import {commonRequest} from "./common";

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
    default:
      break;
  }
}

export default function* watchUser() {
  yield all([takeEvery(RETRIEVE_PROFILE_REQUEST, handleUser)]);
  yield all([takeEvery(ACTIVATE_USER_REQUEST, handleUser)]);
}
