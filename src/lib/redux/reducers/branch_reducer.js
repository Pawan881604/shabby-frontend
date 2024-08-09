import {
  FETCH_BRANCH_DETAILS_FAILURE,
  FETCH_BRANCH_DETAILS_REQUEST,
  FETCH_BRANCH_DETAILS_SUCCESS,
  FETCH_BRANCH_ERROR,
  FETCH_BRANCH_FAILURE,
  FETCH_BRANCH_REQUEST,
  FETCH_BRANCH_SUCCESS,
  UPDATE_BRANCH_DETAILS_FAILURE,
  UPDATE_BRANCH_DETAILS_REQUEST,
  UPDATE_BRANCH_DETAILS_RESET,
  UPDATE_BRANCH_DETAILS_SUCCESS,
  ADD_BRANCH_DETAILS_FAILURE,
  ADD_BRANCH_DETAILS_REQUEST,
  ADD_BRANCH_DETAILS_RESET,
  ADD_BRANCH_DETAILS_SUCCESS,
} from "../constants/branch_actionTypes";

export const branch_reducer = (
  state = { branch: [], branch_details: {} },
  action,
) => {
  switch (action.type) {
    case FETCH_BRANCH_REQUEST:
    case UPDATE_BRANCH_DETAILS_REQUEST:
    case ADD_BRANCH_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BRANCH_DETAILS_REQUEST:
      return {
        ...state,
        loading_: true,
      };
    case FETCH_BRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        branch: action.payload,
      };
    case UPDATE_BRANCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        update: true,
        branch: action.payload,
      };
    case ADD_BRANCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        branch: action.payload,
      };
    case FETCH_BRANCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading_: false,
        branch_details: action.payload,
      };
    case FETCH_BRANCH_FAILURE:
    case FETCH_BRANCH_DETAILS_FAILURE:
    case UPDATE_BRANCH_DETAILS_FAILURE:
    case ADD_BRANCH_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        loading_: false,
        branch: null,
        update: null,
        error: action.payload,
      };
    case UPDATE_BRANCH_DETAILS_RESET:
    case ADD_BRANCH_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        success: null,
        update: null,
        branch_details:null
      };

    case FETCH_BRANCH_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
