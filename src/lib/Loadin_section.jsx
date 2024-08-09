import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const Loadin_section = () => {

  return (
    <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            height: "400px",
          }}
        >
          <CircularProgress />
        </Box>
    </>
  );
};
