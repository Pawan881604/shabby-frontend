import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { config } from "../../../config";
import { Notifications } from "../../../components/dashboard/settings/notifications";
import { UpdatePasswordForm } from "../../../components/dashboard/settings/update-password-form";
// import { AccountDetailsForm } from "components/dashboard/settings/account-details-form";
import { Box, Grid } from "@mui/material";

// Assuming Metadata is part of Next.js, converting metadata to JavaScript
export const metadata = { title: `Settings | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <Grid container spacing={2}>
      <Grid lg={12} md={12} sm={12} xs={12}>
        <Box sx={{ padding: "15px" }}>
          <Typography variant="h4">Settings</Typography>
        </Box>
      </Grid>
      {/* <Grid lg={6} md={6} sm={6} xs={12}>
        <Notifications />
      </Grid> */}

      {/* <Grid lg={6} md={6} sm={6} xs={12}>
        <AccountDetailsForm />
      </Grid> */}

      <Grid lg={6} md={6} sm={6} xs={12}>
        <UpdatePasswordForm />
      </Grid>
    </Grid>
  );
}
