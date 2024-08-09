import * as React from 'react';
import { config } from '../../../config';
import { GuestGuard } from '../../../components/auth/guest-guard';
import { Layout } from '../../../components/auth/layout';
export const metadata = {
  title: `Reset password | Auth | ${config.site.name}`
};
export default function Page(){
  return (
    <Layout>
      <GuestGuard>
        zxczxcxzc      </GuestGuard>
    </Layout>
  );
}
