import {
  FETCH_USER_DETAILS_FAILURE,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_RESET,
  UPDATE_USER_DETAILS_SUCCESS,
  
} from "../constants/user_actionTypes";

export const userReducer = (state = { user: [], user_details: {} }, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
    case UPDATE_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading_: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        update: true,
        user: action.payload,
      };
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading_: false,
        user_details: action.payload,
      };
    case FETCH_USER_FAILURE:
    case FETCH_USER_DETAILS_FAILURE:
    case UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        loading_: false,
        user: null,
        update: null,
        error: action.payload,
      };
    case UPDATE_USER_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        update: null,
      };

    case FETCH_USER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
