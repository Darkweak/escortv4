import * as actions from './action';

const initialState = {
  fetching_profile: false,
  fetching_profile_error: false,
  profile: null,

  fetching_activation: false,
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case actions.RETRIEVE_PROFILE_FAILED:
      return {
        ...state,
        fetching_profile: false,
        fetching_profile_error: true,
        profile: null,
      };
    case actions.RETRIEVE_PROFILE_REQUEST:
      return {
        ...state,
        fetching_profile: false,
        fetching_profile_error: true,
        profile: null,
      };
    case actions.RETRIEVE_PROFILE_SUCCESS:
      return {
        ...state,
        fetching_profile: false,
        fetching_profile_error: false,
        profile: payload,
      };
    default:
      return state;
  }
};
