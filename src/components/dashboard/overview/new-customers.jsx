import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

const statusMap = {
  pending: {
    label: 'Pending',
    color: 'warning'
  },
  Active: {
    label: 'Active',
    color: 'success'
  },
  Deactivate: {
    label: 'Deactivate',
    color: 'error'
  }
};

export function NewCustomers({ customers = [], sx }) {
  return (
    <Card sx={sx}>
      <CardHeader title="New Customers" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">Join Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(customer => {
              const { label, color } = statusMap[customer.status] ?? {
                label: 'Unknown',
                color: 'default'
              };
              return (
                <TableRow hover key={customer.id}>
                  <TableCell>{customer.customer.name}</TableCell>
                  <TableCell>{dayjs(customer.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
