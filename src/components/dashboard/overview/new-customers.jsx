import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Data_grid_table } from "lib/Data_grid_table";
import { get_all_users } from "../../../api/authapi";
import { get_all_branch } from "../../../api/branchapi";
import Link from "next/link";

const statusMap = {
  pending: {
    label: "Pending",
    color: "warning",
  },
  Active: {
    label: "Active",
    color: "success",
  },
  Deactivate: {
    label: "Deactivate",
    color: "error",
  },
};

export function NewCustomers({ sx }) {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.users);
  const { branch } = useSelector((state) => state.branch);

  React.useEffect(() => {
    dispatch(get_all_users());
    dispatch(get_all_branch());
  }, [dispatch]);

  const columns = [
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "branch",
      headerName: "Branch",
      flex: 1,
      renderCell: (params) => {
        const branchId = params.value;
        const branchItem = branch.find(
          (item) => item.branch_id === branchId[0]
        );

        return <div>{branchItem ? branchItem.branch : "Branch Not Set"}</div>;
      },
    },
    {
      field: "authorize",
      headerName: "Authorize",
      minWidth: 150,
      maxWidth: 300,
      flex: 1,
    },
    {
      field: "role",
      headerName: "User role",
      minWidth: 150,
      maxWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      // renderCell: (params) => <TimeAgo time={params.value} />,
    },
  ];

  const rows = [];
  if (Array.isArray(user)) {
    user.slice(0,8).forEach((item, i) => {
      rows.push({
        id: item.user_id,
        phone: item.phone_number,
        branch: item.branch === null ? "Not set" : item.branch,
        authorize: item.authorize,
        role: item.role,
        status: item.status,
      });
    });
  }

  return (
    <Card sx={sx} className="over-n-cus">
      <CardHeader title="New Customers" />
      <Divider />
      <Box sx={{ overflowX: "auto" }}>
        <Data_grid_table rows={rows} columns={columns} loading={loading} />
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Link style={{textDecoration:'none',color:'blue'}} href={'/dashboard/customers'}>View all</Link>
        </CardActions>
      </CardActions>
    </Card>
  );
}
