export const OUTING_CREATE_FAILED = 'OUTING_CREATE_FAILED';
export const OUTING_CREATE_REQUEST = 'OUTING_CREATE_REQUEST';
export const OUTING_CREATE_SUCCESS = 'OUTING_CREATE_SUCCESS';

export const createOuting = data => ({
  type: OUTING_CREATE_REQUEST,
  payload: data,
});
