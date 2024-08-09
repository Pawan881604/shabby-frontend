import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '../../../config';
import { AccountDetailsForm } from '../../../components/dashboard/account/account-details-form';
import { AccountInfo } from '../../../components/dashboard/account/account-info';

// Assuming Metadata is part of Next.js, converting metadata to JavaScript
export const metadata = { title: `Account | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
}