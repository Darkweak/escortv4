import {all, takeEvery} from 'redux-saga/effects';
import {
  OUTING_CREATE_FAILED,
  OUTING_CREATE_REQUEST,
  OUTING_CREATE_SUCCESS,
  OUTING_FETCH_AROUND_FAILED,
  OUTING_FETCH_AROUND_REQUEST,
  OUTING_FETCH_AROUND_SUCCESS,
  OUTING_PARTICIPATE_FAILED,
  OUTING_PARTICIPATE_REQUEST,
  OUTING_PARTICIPATE_SUCCESS,
  OUTING_SHOW_FAILED,
  OUTING_SHOW_REQUEST,
  OUTING_SHOW_SUCCESS
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
        {
          pathname: '/outings',
          method: 'POST',
          callback_events: {
            success: OUTING_CREATE_SUCCESS,
            error: OUTING_CREATE_FAILED,
          },
          body: payload,
        }
      );
      break;
    case OUTING_FETCH_AROUND_REQUEST:
      yield commonRequest(
        {
          pathname: '/around_me',
          method: 'POST',
          callback_events: {
            success: OUTING_FETCH_AROUND_SUCCESS,
            error: OUTING_FETCH_AROUND_FAILED,
          },
          body: payload,
          is_list: true,
        }
      );
      break;
    case RETRIEVE_OUTINGS_LIST_REQUEST:
      yield commonRequest({
        pathname: '/outings',
        method: 'GET',
        callback_events: {
          success: RETRIEVE_OUTINGS_LIST_SUCCESS,
          error: RETRIEVE_OUTINGS_LIST_FAILED,
        },
        is_list: true
      });
      break;
    case OUTING_PARTICIPATE_REQUEST:
      yield commonRequest({
        pathname: `/participate`,
        method: 'POST',
        callback_events: {
          success: OUTING_PARTICIPATE_SUCCESS,
          error: OUTING_PARTICIPATE_FAILED,
        },
        body: payload
      });
      break;
    case OUTING_SHOW_REQUEST:
      yield commonRequest({
        pathname: `/outings/${payload}`,
        method: 'GET',
        callback_events: {
          success: OUTING_SHOW_SUCCESS,
          error: OUTING_SHOW_FAILED,
        }
      });
      break;
    default:
      break;
  }
}

export default function* watchOuting() {
  yield all([takeEvery(OUTING_CREATE_REQUEST, handleOuting)]);
  yield all([takeEvery(OUTING_FETCH_AROUND_REQUEST, handleOuting)]);
  yield all([takeEvery(RETRIEVE_OUTINGS_LIST_REQUEST, handleOuting)]);
  yield all([takeEvery(OUTING_PARTICIPATE_REQUEST, handleOuting)]);
  yield all([takeEvery(OUTING_SHOW_REQUEST, handleOuting)]);
}
