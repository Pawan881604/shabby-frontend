import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export function TotalCustomers({ sx }) {
  const { count_users } = useSelector((state) => state.users);
  return (
   <Link style={{textDecoration:'none'}} href={'/dashboard/customers'}>
     <Card sx={sx}>
    <CardContent>
      <Stack spacing={2}>
        <Stack
          direction="row"
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Customers
            </Typography>
            <Typography variant="h4">{count_users}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "var(--mui-palette-success-main)",
              height: "56px",
              width: "56px",
            }}
          >
            <UsersIcon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
   </Link>
  );
}