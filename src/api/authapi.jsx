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
      others_method(),
    );
    return {
      data,
    }; // Always return an object
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
      get_method(),
    );

    dispatch({ type: FETCH_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILURE, error: axios_error(error) });
  }
};

export const update_user = (user_data, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
    const { data } = await axiosInstance.put(
      `${getSiteURL()}api/v1/auth/action-user/${id}`,
      { user_data },
      others_method(),
    );

    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: UPDATE_USER_DETAILS_FAILURE, error: axios_error(error) });
  }
};

export const get_user_details = (user_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_DETAILS_REQUEST });
    const { data } = await axiosInstance.get(
      `${getSiteURL()}api/v1/auth/all-users?user_id=${user_id}`,
      get_method(),
    );

    dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: data.users[0] });
  } catch (error) {
    dispatch({ type: FETCH_USER_DETAILS_FAILURE, error: axios_error(error) });
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
      others_method(),
    );
    return response.data; // Always return an object
  } catch (error) {
    return axios_error(error);
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_ERROR });
};
