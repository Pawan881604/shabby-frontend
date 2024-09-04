import {
  FETCH_SEARCH_ERROR,
  FETCH_SEARCH_FAILURE,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_RESET,
  FETCH_SEARCH_SUCCESS,
} from "../constants/search_actionTypes";

export const search_reducer = (
  state = { search_data: [], search_details: {} },
  action
) => {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        search_data: action.payload,
      };

    case FETCH_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SEARCH_RESET:
      return {
        ...state,
        loading: false,
        search_data: null,
      };

    case FETCH_SEARCH_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
