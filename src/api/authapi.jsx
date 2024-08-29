import axiosInstance from "../lib/AxiosInstance";
import { getSiteURL } from "../lib/get-site-url";
import { axios_error } from "../lib/axios_error";
import { others_method, get_method } from "../lib/headers";
import {
  FETCH_USER_DETAILS_FAILURE,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  FETCH_USER_ERROR,
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAILURE,
} from "../lib/redux/constants/user_actionTypes";

//________________________________________________________________________
export const Auth = async (user_id, uuid) => {
  try {
    const { data } = await axiosInstance.post(
      `${getSiteURL()}api/v1/auth/authenticate`,
      {
        phone_number: "+" + user_id,
        uuid,
      },
      others_method()
    );
    return {
      data,
    }; // Always return an object
  } catch (error) {
    return axios_error(error);
  }
};

//________________________________________________________________________
export const Login_user = async (email, password, uuid) => {
  try {
    const response = await axiosInstance.post(
      `${getSiteURL()}api/v1/auth/login`,
      {
        email,
        password,
        uuid,
      },
      others_method()
    );
    return response.data;
  } catch (error) {
    return axios_error(error);
  }
};

//_________________________________________________________________
export const get_all_users = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_REQUEST });
    const { data } = await axiosInstance.get(
      `${getSiteURL()}api/v1/auth/all-users`,
      get_method()
    );

    dispatch({ type: FETCH_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const update_user = (user_data, branches, id) => async (dispatch) => {
  try {
    const jsonBranches = JSON.stringify(branches);

    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
    const { data } = await axiosInstance.put(
      `${getSiteURL()}api/v1/auth/action-user/${id}`,
      { user_data, branches: jsonBranches },
      others_method()
    );

    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const reset_user_password = (user_data, email) => async (dispatch) => {
  try {
    const { password } = user_data;
    dispatch({ type: USER_PASSWORD_RESET_REQUEST });
    const { data } = await axiosInstance.put(
      `${getSiteURL()}api/v1/auth/edit-admin-user`,
      { email, password },
      others_method()
    );

    dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_RESET_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const ADD_user = (user_data, uuid) => async (dispatch) => {
  try {
    const { email, password } = user_data;
    dispatch({ type: ADD_USER_REQUEST });
    const { data } = await axiosInstance.post(
      `${getSiteURL()}api/v1/auth/edit-admin-user`,
      { email, password, uuid },
      others_method()
    );

    dispatch({ type: ADD_USER_SUCCESS, payload: data.users });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_USER_FAILURE, payload: error.response.data.message });
  }
};

export const add_normal_user =
  (user_data, branches, uuid) => async (dispatch) => {
    const jsonBranches = JSON.stringify(branches);
    try {
      const { phone } = user_data;
      dispatch({ type: ADD_USER_REQUEST });
      const { data } = await axiosInstance.post(
        `${getSiteURL()}api/v1/auth/edit-user`,
        { phone_number:phone, branches:jsonBranches, uuid },
        others_method()
      );

      dispatch({ type: ADD_USER_SUCCESS, payload: data.users });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
export const get_user_details = (user_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_DETAILS_REQUEST });
    const { data } = await axiosInstance.get(
      `${getSiteURL()}api/v1/auth/all-users?user_id=${user_id}`,
      get_method()
    );

    dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: data.users[0] });
  } catch (error) {
    dispatch({
      type: FETCH_USER_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

//______________________________________________________________________________________
export const Otp_auth = async (otp, user_id, uuid) => {
  try {
    const response = await axiosInstance.put(
      `${getSiteURL()}api/v1/auth/otp`,
      {
        otp,
        user_id,
        uuid,
      },
      others_method()
    );
    return response.data; // Always return an object
  } catch (error) {
    return axios_error(error);
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_ERROR });
};
