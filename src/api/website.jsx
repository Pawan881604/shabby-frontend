import axiosInstance from "../lib/AxiosInstance";
import { getSiteURL } from "../lib/get-site-url";
import { axios_error } from "../lib/axios_error";
import {
  others_method,
  get_method,
  others_multiform_method,
} from "../lib/headers";
import {
  ADD_WEBSITE_DETAILS_FAILURE,
  ADD_WEBSITE_DETAILS_REQUEST,
  ADD_WEBSITE_DETAILS_SUCCESS,
  FETCH_WEBSITE_DETAILS_FAILURE,
  FETCH_WEBSITE_DETAILS_REQUEST,
  FETCH_WEBSITE_DETAILS_SUCCESS,
  FETCH_WEBSITE_ERROR,
  FETCH_WEBSITE_FAILURE,
  FETCH_WEBSITE_REQUEST,
  FETCH_WEBSITE_SUCCESS,
  UPDATE_WEBSITE_DETAILS_FAILURE,
  UPDATE_WEBSITE_DETAILS_REQUEST,
  UPDATE_WEBSITE_DETAILS_SUCCESS,
} from "lib/redux/constants/website_actionTypes";

export const add_website = (web_data, files, uuid) => async (dispatch) => {
  try {
    const { title, description, link, status } = web_data;

    dispatch({ type: ADD_WEBSITE_DETAILS_REQUEST });
    const { data } = await axiosInstance.post(
      `${getSiteURL()}api/v1/action-websites`,
      { title, description, link, status, image: files, uuid },
      others_multiform_method()
    );

    // const datass = 'asasdasd'

    dispatch({ type: ADD_WEBSITE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_WEBSITE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const update_website = (web_data, files, id) => async (dispatch) => {
  try {
    console.log(web_data, files, id);
    const { title, description, link, status } = web_data;
    dispatch({ type: UPDATE_WEBSITE_DETAILS_REQUEST });
    const { data } = await axiosInstance.put(
      `${getSiteURL()}api/v1/action-website/${id}`,
      { title, description, link, status, image: files },
      others_multiform_method()
    );

    dispatch({ type: UPDATE_WEBSITE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_WEBSITE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const get_all_website = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_WEBSITE_REQUEST });
    const { data } = await axiosInstance.get(
      `${getSiteURL()}api/v1/websites`,
      get_method()
    );
    dispatch({ type: FETCH_WEBSITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_WEBSITE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const get_website_details = (website_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_WEBSITE_DETAILS_REQUEST });
    const { data } = await axiosInstance.get(
      `${getSiteURL()}api/v1/websites?website_id=${website_id}`,
      get_method()
    );

    dispatch({
      type: FETCH_WEBSITE_DETAILS_SUCCESS,
      payload: data.web_data[0],
    });
  } catch (error) {
    dispatch({
      type: FETCH_WEBSITE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: FETCH_WEBSITE_ERROR });
};
