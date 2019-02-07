export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export const loginUser = data => ({
  type: LOGIN_REQUEST,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT
});
