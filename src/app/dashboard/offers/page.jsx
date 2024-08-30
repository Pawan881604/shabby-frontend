"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useDispatch, useSelector } from "react-redux";
import { TimeAgo } from "lib/TimeAgo";
import {
  clearErrors,
  get_all_users,
  get_user_details,
} from "../../../api/authapi";
import { Edit_customer } from "../../../components/dashboard/customer/Edit_customer";
import { Data_grid_table } from "../../../lib/Data_grid_table.jsx";
import {
  ADD_USER_RESET,
  UPDATE_USER_DETAILS_RESET,
} from "lib/redux/constants/user_actionTypes";
import { Alert_ } from "styles/theme/alert";
import { Box } from "@mui/material";
import { Tabs } from "components/dashboard/offers/tabs_/Tabs";

const Page = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, user, success, update, error } = useSelector(
    (state) => state.users
  );
  const { branch } = useSelector((state) => state.branch);

  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(true);
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

      setAlertMessage("Customer added successfully!");
      dispatch({ type: ADD_USER_RESET });
    }
    if (update) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("User details updated successfully!");
      dispatch({ type: UPDATE_USER_DETAILS_RESET });
    }
  }, [dispatch, update, error, success]);

  const get_single_user = async (user_id) => {
    await dispatch(get_user_details(user_id));
    setOpen(true);
    setIsvisible(true);
  };
  const Show_form = () => {
    dispatch({ type: UPDATE_USER_DETAILS_RESET });
    setOpen(true);
    setIsvisible(false);
  };
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
        const branchIds = params.row.branch; // Assuming params.value is an array of branch IDs
        const branchItems =
          branch &&
          branch.filter((item, i) => branchIds.includes(item.branch_id));
        return (
          <div>
            {branchItems && branchItems.length > 0
              ? branchItems &&
                branchItems.map((item, i) => (
                  <span key={i}>{item.branch},</span>
                ))
              : "Branch Not Set"}
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
      field: "manager",
      headerName: "Manager",
      flex: 1,
      renderCell: (params) => {
        const manager = params.row.manager;
        return <div>{manager ? manager.name : "Self"}</div>;
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
      if (item.role === "user") {
        rows.push({
          id: item.user_id,
          phone: item.phone_number,
          branch: item.branch === null ? "Not set" : item.branch,
          status: item.status,
          update: item.update_at,
          manager: item.user,
          create: item.create_at,
        });
      }
    });
  }

  return (
    <Box>
      <Box>
     <Tabs/>
      </Box>
      <Box>
        <Stack spacing={3}>
          <Edit_customer
            open={open}
            isvisible={isvisible}
            setIsvisible={setIsvisible}
            setOpen={setOpen}
          />
          <Stack direction="row" spacing={3}>
            <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
              <Typography variant="h4">Customers</Typography>
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
                onClick={() => Show_form()}
              >
                Add Customer
              </Button>
            </div>
          </Stack>

          <Data_grid_table rows={rows} columns={columns} loading={loading} />
        </Stack>
      </Box>
    </Box>
  );
};

export default Page;
