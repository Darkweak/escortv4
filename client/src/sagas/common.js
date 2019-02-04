import {put} from 'redux-saga/effects';

export function* commonRequest(pathname, method, callback_events, body = {}, is_list = false) {
  try {
    const contentHeaders = new Headers();
    contentHeaders.append('Accept', 'application/ld+json');
    contentHeaders.append('Content-Type', 'application/ld+json');
    const request = new Request(
      `${process.env.REACT_APP_API_ENTRYPOINT}${pathname}`,
      {
        method: method,
        headers: contentHeaders,
        body: JSON.stringify()
      },
    );
    const response = yield fetch(request).then(response => {
      if (response.status < 200 || response.status >= 300)
        throw new Error(response.statusText);
      return response.json();
    });
    yield put({
      type: callback_events.success,
      payload: is_list ? response["hydra:member"] : response,
    });
  } catch (e) {
    yield put({
      type: callback_events.error
    })
  }
}
