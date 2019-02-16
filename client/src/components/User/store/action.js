export const RETRIEVE_PROFILE_FAILED = 'RETRIEVE_PROFILE_FAILED';
export const RETRIEVE_PROFILE_REQUEST = 'RETRIEVE_PROFILE_REQUEST';
export const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
export const ACTIVATE_USER_REQUEST = 'ACTIVATE_USER_REQUEST';

export const getProfile = () => ({
  type: RETRIEVE_PROFILE_REQUEST,
});

export const activateUser = data => ({
  type: ACTIVATE_USER_REQUEST,
  payload: data
})
