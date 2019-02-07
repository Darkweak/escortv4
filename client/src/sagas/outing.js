import {all, takeEvery} from 'redux-saga/effects';
import {
  OUTING_CREATE_FAILED,
  OUTING_CREATE_REQUEST,
  OUTING_CREATE_SUCCESS
} from "../components/Outing/store/action";
import {commonRequest} from "./common";
import {
  RETRIEVE_OUTINGS_LIST_FAILED,
  RETRIEVE_OUTINGS_LIST_REQUEST,
  RETRIEVE_OUTINGS_LIST_SUCCESS
} from "../components/Welcome/store/action";

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
    case RETRIEVE_OUTINGS_LIST_REQUEST:
      yield commonRequest(
        '/outings',
        'GET',
        {
          success: RETRIEVE_OUTINGS_LIST_SUCCESS,
          error: RETRIEVE_OUTINGS_LIST_FAILED,
        },
        undefined,
        true
      );
      break;
    default:
      break;
  }
}

export default function* watchOuting() {
  yield all([takeEvery(OUTING_CREATE_REQUEST, handleOuting)]);
  yield all([takeEvery(RETRIEVE_OUTINGS_LIST_REQUEST, handleOuting)]);
}
