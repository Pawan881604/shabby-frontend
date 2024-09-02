import { SHOW_ALERT, HIDE_ALERT } from "lib/redux/constants/alert_actionTypes";

export const showAlert = (message, color) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_ALERT, payload: { message, color } });
  } catch (err) {}
};

export const hideAlert = () => async (dispatch) => {
  try {
    dispatch({ type: HIDE_ALERT });
  } catch (err) {}
};
