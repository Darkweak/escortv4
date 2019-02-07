import {all, takeEvery} from 'redux-saga/effects';
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from "../components/Register/store/action";
import {commonRequest} from "./common";

function* handleRegister(action) {
  const {payload, type} = action;
  switch (type) {
    case REGISTER_REQUEST:
      yield commonRequest(
        '/users',
        'POST',
        {
          success: REGISTER_SUCCESS,
          error: REGISTER_FAILED,
        },
        payload,
      );
      break;
    default:
      break;
  }
}

export default function* watchRegister() {
  yield all([takeEvery(REGISTER_REQUEST, handleRegister)]);
}
