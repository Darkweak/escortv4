import {all, takeEvery} from 'redux-saga/effects';
import {
  RETRIEVE_PROFILE_FAILED,
  RETRIEVE_PROFILE_REQUEST,
  RETRIEVE_PROFILE_SUCCESS
} from "../components/User/store/action";
import {commonRequest} from "./common";

function* handleUser(action) {
  const {payload, type} = action;
  switch (type) {
    case RETRIEVE_PROFILE_REQUEST:
      yield commonRequest(
        '/profile',
        'GET',
        {
          success: RETRIEVE_PROFILE_SUCCESS,
          error: RETRIEVE_PROFILE_FAILED,
        },
        payload,
      );
      break;
    default:
      break;
  }
}

export default function* watchUser() {
  yield all([takeEvery(RETRIEVE_PROFILE_REQUEST, handleUser)]);
}
