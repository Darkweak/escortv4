export const OUTING_CREATE_FAILED = 'OUTING_CREATE_FAILED';
export const OUTING_CREATE_REQUEST = 'OUTING_CREATE_REQUEST';
export const OUTING_CREATE_SUCCESS = 'OUTING_CREATE_SUCCESS';
export const OUTING_SHOW_FAILED = 'OUTING_SHOW_FAILED';
export const OUTING_SHOW_REQUEST = 'OUTING_SHOW_REQUEST';
export const OUTING_SHOW_SUCCESS = 'OUTING_SHOW_SUCCESS';
export const OUTING_PARTICIPATE_FAILED = 'OUTING_PARTICIPATE_FAILED';
export const OUTING_PARTICIPATE_REQUEST = 'OUTING_PARTICIPATE_REQUEST';
export const OUTING_PARTICIPATE_SUCCESS = 'OUTING_PARTICIPATE_SUCCESS';

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