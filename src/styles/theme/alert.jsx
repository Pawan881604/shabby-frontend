"use client";
import { Alert } from "@mui/material";
import { hideAlert, showAlert } from "api/alert_action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Alert_ = ({
  success,
  update,
  error,
  clearErrors,
  add_reset,
  update_reset,get_data,currentPage
}) => {
  const dispatch = useDispatch();
  const { show, message, color } = useSelector((state) => state.alert);

  useEffect(() => {
    if (error) {
      dispatch(showAlert(error, "error"));
      dispatch(clearErrors());
    }
    if (success) {
      dispatch(showAlert("Details Added successfully!", "success"));
      dispatch({ type: add_reset });
      dispatch(get_data(currentPage));
    }
    if (update) {
      dispatch(showAlert("Details Updated successfully!", "success"));
      dispatch({ type: update_reset });
      dispatch(get_data(currentPage));
    }
  }, [dispatch, update, success, error,currentPage]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    show && (
      <Alert
        style={{ position: "fixed", zIndex: 10000, right: "8px", top: "10px" }}
        severity={color === "success" ? "success" : "error"}
        onClose={() => dispatch(hideAlert())}
      >
        {message}
      </Alert>
    )
  );
};
