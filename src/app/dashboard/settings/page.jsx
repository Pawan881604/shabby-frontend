import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { config } from '../../../config';
import { Notifications } from '../../../components/dashboard/settings/notifications';
import { UpdatePasswordForm } from '../../../components/dashboard/settings/update-password-form';


// Assuming Metadata is part of Next.js, converting metadata to JavaScript
export const metadata = { title: `Settings | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Settings</Typography>
      </div>
      <Notifications />
      <UpdatePasswordForm />
    </Stack>
  );
}