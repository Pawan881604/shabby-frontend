import { SHOW_ALERT, HIDE_ALERT } from "../constants/alert_actionTypes";
let inialState = {
    show: false,
    message: "",
    color: "success",
  };
const alertReducer = (state = inialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        show: true,
        message: action.payload.message,
        color: action.payload.color,
      };
    case HIDE_ALERT:
      return {
        ...state,
        show: false,
        message: "",
        color: "success",
      };
    default:
      return state;
  }
};

export default alertReducer;
