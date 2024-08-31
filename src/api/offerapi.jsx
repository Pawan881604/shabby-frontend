import axiosInstance from "../lib/AxiosInstance";
import { getSiteURL } from "../lib/get-site-url";
import {
  others_method,
  get_method,
  others_multiform_method,
} from "../lib/headers";
import {
  ADD_OFFER_DETAILS_FAILURE,
  ADD_OFFER_DETAILS_REQUEST,
  ADD_OFFER_DETAILS_SUCCESS,
  ADD_OFFER_SLIDER_DETAILS_REQUEST,
  ADD_OFFER_SLIDER_DETAILS_SUCCESS,
  FETCH_OFFER_SLIDER_FAILURE,
  FETCH_OFFER_SLIDER_REQUEST,
  FETCH_OFFER_SLIDER_SUCCESS,
  FETCH_OFFERS_DETAILS_FAILURE,
  FETCH_OFFERS_DETAILS_REQUEST,
  FETCH_OFFERS_DETAILS_SUCCESS,
  UPDATE_OFFER_SLIDER_DETAILS_FAILURE,
  UPDATE_OFFER_SLIDER_DETAILS_RESET,
  UPDATE_OFFER_SLIDER_DETAILS_SUCCESS,
} from "lib/redux/constants/offer_actionTypes";

export const add_offer_slider = (data_, files, uuid) => async (dispatch) => {
  try {
    dispatch({ type: ADD_OFFER_SLIDER_DETAILS_REQUEST });
    const { data } = await axiosInstance.post(
      `${getSiteURL()}api/v1/action-offer_slider`,
      { data_, image: files, uuid },
      others_multiform_method()
    );

    dispatch({ type: ADD_OFFER_SLIDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_WEBSITE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const update_offer_slider = (status, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_OFFER_SLIDER_DETAILS_RESET });
    const { data } = await axiosInstance.put(
      `${getSiteURL()}api/v1/action-offer_slider`,
      { status, id },
      others_method()
    );

    dispatch({ type: UPDATE_OFFER_SLIDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_OFFER_SLIDER_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const get_all_offer_slider = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_OFFER_SLIDER_REQUEST });
    const { data } = await axiosInstance.get(
      `${getSiteURL()}api/v1/offer_slider`,
      get_method()
    );

    dispatch({ type: FETCH_OFFER_SLIDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_OFFER_SLIDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

//---------------------------------------------------------

export const add_offer = (data_, ids, files, uuid) => async (dispatch) => {
  console.log(data_, ids, files, uuid);

  try {
    dispatch({ type: ADD_OFFER_DETAILS_REQUEST });
    const { data } = await axiosInstance.post(
      `${getSiteURL()}api/v1/action-offer`,
      { data_, ids, image: files, uuid },
      others_multiform_method()
    );

    dispatch({ type: ADD_OFFER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_OFFER_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const get_all_offer = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_OFFERS_DETAILS_REQUEST });
    const { data } = await axiosInstance.get(
      `${getSiteURL()}api/v1/all-offer`,
      get_method()
    );

    dispatch({ type: FETCH_OFFERS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_OFFERS_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: FETCH_WEBSITE_ERROR });
};
