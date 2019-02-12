import {put} from 'redux-saga/effects';
import {serializeForm} from "../functions/serialize";
import {getToken, isLogged} from "../functions/logged";
import {LOGOUT} from "../components/Login/store/action";

function* handleResponse(response) {
  switch (response.code) {
    case 401:
      switch (response.message) {
        case 'Expired JWT Token':
          return yield put({
            type: LOGOUT
          });
        default:
          break;
      }
      break;
    default:
      break;
  }
}

export function* commonRequest(item) {
  try {
    let errored = false;
    const {pathname, method, callback_events, body, is_list} = item;
    const contentHeaders = new Headers();
    contentHeaders.append('Accept', 'application/ld+json');
    contentHeaders.append('Content-Type', 'application/ld+json');
    isLogged() && contentHeaders.append('Authorization', `Bearer ${getToken()}`);
    const request = new Request(
      `${process.env.REACT_APP_API_ENTRYPOINT}${pathname}`,
      {
        method: method,
        headers: contentHeaders,
        body: body ? JSON.stringify(serializeForm(body)) : body
      },
    );
    const response = yield fetch(request).then(response => {
      if (response.status < 200 || response.status >= 300)
        errored = true;
      return response.json();
    });
    yield handleResponse(response);
    yield put({
      type: errored ? callback_events.error : callback_events.success,
      payload: is_list ? response["hydra:member"] : response,
    });
  } catch (e) {
  }
}
