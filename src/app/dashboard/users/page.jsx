"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  get_all_users,
  get_user_details,
} from "../../../api/authapi";
import { Edit_users } from "../../../components/dashboard/users/Edit_users";
import { Data_grid_table } from "../../../lib/Data_grid_table.jsx";
import { UPDATE_USER_DETAILS_RESET } from "lib/redux/constants/user_actionTypes";
import { Alert_ } from "styles/theme/alert";
import { TimeAgo } from "lib/TimeAgo";

const Page = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [isvisible, setIsvisible] = useState(true);
  const dispatch = useDispatch();
  const { loading, user, success, error } = useSelector((state) => state.users);
  const { branch } = useSelector((state) => state.branch);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(get_all_users());
    if (error) {
      setShowAlert(true);
      setAlertColor(false);
      setAlertMessage(error);
      dispatch(clearErrors());
    }
    if (success) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("User add successfully!");
      dispatch({ type: UPDATE_USER_DETAILS_RESET });
    }
  }, [dispatch, success, error]);


  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "User role",
      minWidth: 150,
      maxWidth: 300,
      flex: 1,
      renderCell: (params) => {
        const role = params.row.role;
        return (
          <div
            style={{
              color: role !== "Admin" ? "orange" : "green",
              fontWeight: 600,
            }}
          >
            {role}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const status = params.row.status;
        return (
          <div
            style={{
              color: status === "Active" ? "green" : "red",
              fontWeight: 600,
            }}
          >
            {status}
          </div>
        );
      },
    },
    {
      field: "update",
      headerName: "Last Update",
      flex: 1,
      renderCell: (params) => {
        const updated_at = params.row.update;
        const created_at = params.row.create;
        return <TimeAgo time={updated_at !== null ? updated_at : created_at} />;
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      flex: 1,
      shortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => get_single_user(params.row.id)}>Edit</Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  if (Array.isArray(user)) {
    user.forEach((item, i) => {
      if (item.role !== "user") {
        rows.push({
          id: item.user_id,
          name: item.name,
          email: item.email,
          role: item.role,
          status: item.status,
          update: item.update_at,
          create: item.create_at,
        });
      }
    });
  }

  const get_single_user = async (user_id) => {
    await dispatch(get_user_details(user_id));
    setOpen(true);
    setIsvisible(true);
  };

const showfrom = ()=>{
  dispatch({ type: UPDATE_USER_DETAILS_RESET });
  setOpen(true);
  setIsvisible(false);
}
  return (
    <Stack spacing={3}>
      <Edit_users open={open} isvisible={isvisible} setOpen={setOpen} />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Shabby members</Typography>
        </Stack>
        <div>
          {showAlert && (
            <Alert_
              status={alertColor ? "success" : "error"}
              setShowAlert={setShowAlert}
              alertMessage={alertMessage}
              showAlert={showAlert}
            />
          )}
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => showfrom()}
          >
            Add Member
          </Button>
        </div>
      </Stack>
      <Data_grid_table rows={rows} columns={columns} loading={loading} />
    </Stack>
  );
};

export default Page;
