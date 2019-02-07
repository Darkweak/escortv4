import {put} from 'redux-saga/effects';
import {serializeForm} from "../functions/serialize";
import {getUser, isLogged} from "../functions/logged";

export function* commonRequest(pathname, method, callback_events, body = {}, is_list = false) {
  try {
    let errored = false;
    const contentHeaders = new Headers();
    contentHeaders.append('Accept', 'application/ld+json');
    contentHeaders.append('Content-Type', 'application/ld+json');
    {
      isLogged() && contentHeaders.append('Authorization', `Bearer ${getUser()}`)
    }
    const request = new Request(
      `${process.env.REACT_APP_API_ENTRYPOINT}${pathname}`,
      {
        method: method,
        headers: contentHeaders,
        body: JSON.stringify(serializeForm(body))
      },
    );
    const response = yield fetch(request).then(response => {
      if (response.status < 200 || response.status >= 300)
        errored = true;
      return response.json();
    });
    if (errored) {
      yield put({
        type: callback_events.error,
        payload: response,
      });
    } else {
      yield put({
        type: callback_events.success,
        payload: is_list ? response["hydra:member"] : response,
      });
    }
  } catch (e) {
  }
}
