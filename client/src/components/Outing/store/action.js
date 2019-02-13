export const OUTING_CREATE_FAILED = 'OUTING_CREATE_FAILED';
export const OUTING_CREATE_REQUEST = 'OUTING_CREATE_REQUEST';
export const OUTING_CREATE_SUCCESS = 'OUTING_CREATE_SUCCESS';
export const OUTING_FETCH_AROUND_FAILED = 'OUTING_FETCH_AROUND_FAILED';
export const OUTING_FETCH_AROUND_REQUEST = 'OUTING_FETCH_AROUND_REQUEST';
export const OUTING_FETCH_AROUND_SUCCESS = 'OUTING_FETCH_AROUND_SUCCESS';
export const OUTING_SHOW_FAILED = 'OUTING_SHOW_FAILED';
export const OUTING_SHOW_REQUEST = 'OUTING_SHOW_REQUEST';
export const OUTING_SHOW_SUCCESS = 'OUTING_SHOW_SUCCESS';
export const OUTING_PARTICIPATE_FAILED = 'OUTING_PARTICIPATE_FAILED';
export const OUTING_PARTICIPATE_REQUEST = 'OUTING_PARTICIPATE_REQUEST';
export const OUTING_PARTICIPATE_SUCCESS = 'OUTING_PARTICIPATE_SUCCESS';
export const OUTING_PARTICIPATE_DETECT = 'OUTING_PARTICIPATE_DETECT';

export const createOuting = data => ({
  type: OUTING_CREATE_REQUEST,
  payload: data,
});

export const retrieveOuting = data => ({
  type: OUTING_SHOW_REQUEST,
  payload: data,
});

export const applyToParticipate = data => ({
  type: OUTING_PARTICIPATE_REQUEST,
  payload: data,
});

export const detectParticipate = data => ({
  type: OUTING_PARTICIPATE_DETECT,
  payload: data,
});

export const fetchAroundCity = data => ({
  type: OUTING_FETCH_AROUND_REQUEST,
  payload: data,
});
