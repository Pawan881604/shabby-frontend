import { Alert } from "@mui/material";
import React, { useEffect } from "react";

export const Alert_ = ({ status, setShowAlert, showAlert, alertMessage }) => {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);
  return (
    <Alert style={{position: 'absolute', zIndex: 10000, right: '8px', top: '10px'}} severity={status} onClose={() => setShowAlert(false)}>
      {alertMessage}
    </Alert>
  );
};
