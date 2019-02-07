import {put} from 'redux-saga/effects';
import {serializeForm} from "../functions/serialize";
import {getUser} from "../functions/logged";

export function* commonRequest(pathname, method, callback_events, body = null, is_list = false) {
  try {
    let errored = false;
    const contentHeaders = new Headers();
    contentHeaders.append('Accept', 'application/ld+json');
    contentHeaders.append('Content-Type', 'application/ld+json');
    contentHeaders.append('Authorization', `Bearer ${getUser()}`)
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
    yield put({
      type: errored ? callback_events.error : callback_events.success,
      payload: is_list ? response["hydra:member"] : response,
    });
  } catch (e) {
  }
}
