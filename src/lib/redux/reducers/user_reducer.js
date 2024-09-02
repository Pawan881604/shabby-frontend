import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_RESET,
  ADD_USER_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_RESET,
  UPDATE_USER_DETAILS_SUCCESS,
  USER_PASSWORD_RESET_FAILURE,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_RESET,
  USER_PASSWORD_RESET_SUCCESS,
} from "../constants/user_actionTypes";

export const userReducer = (state = { user: [], user_details: {} }, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
    case LOGIN_REQUEST:
    case UPDATE_USER_DETAILS_REQUEST:
    case USER_PASSWORD_RESET_REQUEST:
    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading_: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user_details: action.payload.users,
        success: true,
      };
    case USER_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        update: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.users,
        count_users: action.payload.count_users,
        inactiveUsersCount: action.payload.inactiveUsersCount,
        activeUsersCount: action.payload.activeUsersCount,
        resultPerpage: action.payload.resultPerpage,
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
    case ADD_USER_FAILURE:
    case LOGIN_FAILURE:
    case USER_PASSWORD_RESET_FAILURE:
      return {
        ...state,
        loading: false,
        loading_: false,
    
        update: null,
        success: null,
        error: action.payload,
      };
    case UPDATE_USER_DETAILS_RESET:
    case USER_PASSWORD_RESET_RESET:
      return {
        ...state,
        loading: false,
        update: null,
        user_details: null,
      };
    case ADD_USER_RESET:
      return {
        ...state,
        loading: false,
        success: null,
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
