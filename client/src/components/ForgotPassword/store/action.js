export const APPLY_REINITIALIZE_PASSWORD_FAILED = 'APPLY_REINITIALIZE_PASSWORD_FAILED';
export const APPLY_REINITIALIZE_PASSWORD_REQUEST = 'APPLY_REINITIALIZE_PASSWORD_REQUEST';
export const APPLY_REINITIALIZE_PASSWORD_SUCCESS = 'APPLY_REINITIALIZE_PASSWORD_SUCCESS';
export const REINITIALIZE_PASSWORD_FAILED = 'REINITIALIZE_PASSWORD_FAILED';
export const REINITIALIZE_PASSWORD_REQUEST = 'REINITIALIZE_PASSWORD_REQUEST';
export const REINITIALIZE_PASSWORD_SUCCESS = 'REINITIALIZE_PASSWORD_SUCCESS';

export const applyReinitializePassword = data => ({
  type: APPLY_REINITIALIZE_PASSWORD_REQUEST,
  payload: data,
});

export const reinitializePassword = data => ({
  type: REINITIALIZE_PASSWORD_REQUEST,
  payload: data,
});