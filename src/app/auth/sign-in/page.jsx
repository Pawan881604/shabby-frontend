import * as React from 'react';
import { config } from '../../../config';
import { GuestGuard } from '../../../components/auth/guest-guard';
import { Layout } from '../../../components/auth/layout';
import { SignInForm } from '../../../components/auth/sign-in-form';
import { Box } from '@mui/material';
export const metadata = {
  title: `Sign in | Auth | ${config.site.name}`
};

export default function Page() {
  return (
    <Box className='login-page'>
      <Layout>
        <GuestGuard>
          <SignInForm />
        </GuestGuard>
      </Layout>
    </Box>
  );
}
