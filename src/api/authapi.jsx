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
import {
  FETCH_SEARCH_FAILURE,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
} from "lib/redux/constants/search_actionTypes";

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
export const get_all_users =
  (currentPage = 1, fliter_1_user_role) =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_USER_REQUEST });
      let link = `${getSiteURL()}api/v1/auth/all-users?page=${currentPage}&user.role=${fliter_1_user_role}`;

      const { data } = await axiosInstance.get(link, get_method());

      dispatch({ type: FETCH_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const search_all_user =
  (currentPage = 1, fliter_1_user_role, trimmedValue = "") =>
  async (dispatch) => {
   
    try {
      dispatch({ type: FETCH_SEARCH_REQUEST });
      let link = `${getSiteURL()}api/v1/auth/all-users?page=${0}`;

      if (trimmedValue.length > 1) {
        link = `${getSiteURL()}api/v1/auth/all-users?page=${currentPage}&user.role=${fliter_1_user_role}&keyword=${trimmedValue}`;
      }

      const { data } = await axiosInstance.get(link, get_method());
      console.log(data)
      dispatch({ type: FETCH_SEARCH_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({
        type: FETCH_SEARCH_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const update_user = (user_data, ids, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
    const { data } = await axiosInstance.put(
      `${getSiteURL()}api/v1/auth/action-user/${id}`,
      { user_data, ids },
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

export const update_admin_user = (user_data, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
    const { data } = await axiosInstance.put(
      `${getSiteURL()}api/v1/auth/edit-admin-user/${id}`,
      { user_data },
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

export const ADD_user = (user_data, uuid) => async (dispatch) => {
  try {
    dispatch({ type: ADD_USER_REQUEST });
    const { data } = await axiosInstance.post(
      `${getSiteURL()}api/v1/auth/edit-admin-user`,
      { user_data, uuid },
      others_method()
    );

    dispatch({ type: ADD_USER_SUCCESS, payload: data.users });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_USER_FAILURE, payload: error.response.data.message });
  }
};

export const add_normal_user = (user_data, ids, uuid) => async (dispatch) => {
  try {
    const { phone, status } = user_data;
    dispatch({ type: ADD_USER_REQUEST });
    const { data } = await axiosInstance.post(
      `${getSiteURL()}api/v1/auth/edit-user`,
      { phone_number: phone, status, ids, uuid },
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
