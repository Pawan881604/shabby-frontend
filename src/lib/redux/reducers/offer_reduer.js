import {
  ADD_OFFER_DETAILS_FAILURE,
  ADD_OFFER_DETAILS_REQUEST,
  ADD_OFFER_DETAILS_RESET,
  ADD_OFFER_DETAILS_SUCCESS,
  ADD_OFFER_SLIDER_DETAILS_FAILURE,
  ADD_OFFER_SLIDER_DETAILS_REQUEST,
  ADD_OFFER_SLIDER_DETAILS_RESET,
  ADD_OFFER_SLIDER_DETAILS_SUCCESS,
  FETCH_OFFER_ERROR,
  FETCH_OFFER_SLIDER_FAILURE,
  FETCH_OFFER_SLIDER_REQUEST,
  FETCH_OFFER_SLIDER_SUCCESS,
  FETCH_OFFERS_DETAILS_FAILURE,
  FETCH_OFFERS_DETAILS_REQUEST,
  FETCH_OFFERS_DETAILS_SUCCESS,
  UPDATE_OFFER_SLIDER_DETAILS_REQUEST,
  UPDATE_OFFER_SLIDER_DETAILS_RESET,
  UPDATE_OFFER_SLIDER_DETAILS_SUCCESS,
} from "../constants/offer_actionTypes";

export const offer_slider_reducer = (state = { offer_slider: [] }, action) => {
  switch (action.type) {
    case ADD_OFFER_SLIDER_DETAILS_REQUEST:
      return {
        ...state,
        update_loading: true,
      };
    case FETCH_OFFER_SLIDER_REQUEST:
    case UPDATE_OFFER_SLIDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_OFFER_SLIDER_DETAILS_SUCCESS:
      return {
        ...state,
        update_loading: false,
        success: true,
      };
    case UPDATE_OFFER_SLIDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        update: true,
      };
    case FETCH_OFFER_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        offer_slider: action.payload.slide_data,
        total_count: action.payload.count_,
        resultPerpage: action.payload.resultPerpage,
        active_count: action.payload.active_count,
        inactive_count: action.payload.inactive_count,
      };
    case ADD_OFFER_SLIDER_DETAILS_FAILURE:
    case UPDATE_OFFER_SLIDER_DETAILS_REQUEST:
    case FETCH_OFFER_SLIDER_FAILURE:
      return {
        ...state,
        loading: false,
        update_loading: false,
        success: null,
        update: null,
        error: action.payload,
      };
    case ADD_OFFER_SLIDER_DETAILS_RESET:
    case UPDATE_OFFER_SLIDER_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        update_loading: false,
        success: null,
        update: null,
        offer_slider_details: null,
      };

    case FETCH_OFFER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const offer_reducer = (state = { offers: [] }, action) => {
  switch (action.type) {
    case ADD_OFFER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OFFERS_DETAILS_REQUEST:
    // case UPDATE_OFFER_SLIDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_OFFER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    // case UPDATE_OFFER_SLIDER_DETAILS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     update: true,
    //   };
    case FETCH_OFFERS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        offer_data: action.payload.offer_data,
        total_count: action.payload.count_,
        resultPerpage: action.payload.resultPerpage,
        active_count: action.payload.active_count,
        inactive_count: action.payload.inactive_count,
      };
    case ADD_OFFER_DETAILS_FAILURE:
      // case UPDATE_OFFER_SLIDER_DETAILS_REQUEST:
      case FETCH_OFFERS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        success: null,
        update: null,
        error: action.payload,
      };
    case ADD_OFFER_DETAILS_RESET:
      // case UPDATE_OFFER_SLIDER_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        success: null,
        update: null,
        offer_slider_details: null,
      };

    case FETCH_OFFER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
