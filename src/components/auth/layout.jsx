import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function Layout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100%",
      }}
    >
      <Box sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flex: "1",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
