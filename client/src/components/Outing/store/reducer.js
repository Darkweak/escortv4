import * as actions from './action';
import {resetForm} from "../../../functions/serialize";

const initialState = {
  outing_created: false,
  outing_creation_error: false,
  outing_creation_error_cause: [],
  outing_created_elements: [],

  outing: null,
  is_fetching_outing: false,
  outing_fetch_error: false,

  outing_participate: false,
  outing_participate_error: false,
  outing_participate_fetch: false,
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case actions.OUTING_CREATE_FAILED:
      return {
        ...state,
        outing_created: false,
        outing_creation_error: true,
        outing_creation_error_cause: payload.violations,
      };
    case actions.OUTING_CREATE_REQUEST:
      return {
        ...state,
        outing_creation_error: false,
        outing_creation_error_cause: [],
      };
    case actions.OUTING_CREATE_SUCCESS:
      let elements = state.outing_created_elements;
      elements.push(payload);
      resetForm('escort-outing');
      return {
        ...state,
        outing_created: true,
        outing_creation_error: false,
        outing_creation_error_cause: [],
        outing_created_elements: [...elements],
      };
    case actions.OUTING_PARTICIPATE_DETECT:
      return {
        ...state,
        outing_participate: payload,
      };
    case actions.OUTING_PARTICIPATE_FAILED:
      return {
        ...state,
        outing_participate_fetch: false,
        outing_participate_error: true,
      };
    case actions.OUTING_PARTICIPATE_REQUEST:
      return {
        ...state,
        outing_participate_fetch: true,
        outing_participate_error: false,
      };
    case actions.OUTING_PARTICIPATE_SUCCESS:
      return {
        ...state,
        outing_participate_fetch: false,
        outing_participate_error: false,
        outing_participate: !state.outing_participate,
      };
    case actions.OUTING_SHOW_FAILED:
      return {
        ...state,
        outing: null,
        is_fetching_outing: false,
        fetch_outings_error: true,
      };
    case actions.OUTING_SHOW_REQUEST:
      return {
        ...state,
        outing: null,
        is_fetching_outing: true,
        fetch_outings_error: false,
      };
    case actions.OUTING_SHOW_SUCCESS:
      return {
        ...state,
        outing: payload,
        is_fetching_outing: false,
        fetch_outings_error: false,
      };
    default:
      return state;
  }
};
