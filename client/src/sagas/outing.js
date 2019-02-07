import {all, takeEvery} from 'redux-saga/effects';
import {
  OUTING_CREATE_FAILED,
  OUTING_CREATE_REQUEST,
  OUTING_CREATE_SUCCESS
} from "../components/Outing/store/action";
import {commonRequest} from "./common";

function* handleOuting(action) {
  const {payload, type} = action;
  switch (type) {
    case OUTING_CREATE_REQUEST:
      yield commonRequest(
        '/outings',
        'POST',
        {
          success: OUTING_CREATE_SUCCESS,
          error: OUTING_CREATE_FAILED,
        },
        payload,
      );
      break;
    default:
      break;
  }
}

export default function* watchOuting() {
  yield all([takeEvery(OUTING_CREATE_REQUEST, handleOuting)]);
}
