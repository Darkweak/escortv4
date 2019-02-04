import {all, takeEvery} from 'redux-saga/effects';
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from "../components/Login/store/action";
import {commonRequest} from "./common";

function* handleLogin(action) {
  const {payload, type} = action;
  switch (type) {
    case LOGIN_REQUEST:
      yield commonRequest(
        '/login',
        'POST',
        {
          success: LOGIN_SUCCESS,
          error: LOGIN_FAILED,
        },
        payload,
      );
      break;
    default:
      break;
  }
}

export default function* watchLogin() {
  yield all([takeEvery(LOGIN_REQUEST, handleLogin)]);
}
