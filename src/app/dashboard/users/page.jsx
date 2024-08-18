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

const Page = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
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

  const get_single_user = async (user_id) => {
    await dispatch(get_user_details(user_id));
    setOpen(true);
  };

  const columns = [
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "branch",
      headerName: "Branch",
      flex: 1,
      renderCell: (params) => {
        const branchIds = params.row.branch; // Assuming params.value is an array of branch IDs
        const branchItems = branch.filter((item, i) =>
          branchIds.includes(item.branch_id)
        );
        return (
          <div>
            {branchItems.length > 0
              ? branchItems.map((item, i) => (
                  <span key={i}>{item.branch},</span>
                ))
              : "Branch Not Set"}
          </div>
        );
      },
    },
    // {
    //   field: "authorize",
    //   headerName: "Authorize",
    //   minWidth: 150,
    //   maxWidth: 300,
    //   flex: 1,
    // },
    // {
    //   field: "role",
    //   headerName: "User role",
    //   minWidth: 150,
    //   maxWidth: 300,
    //   flex: 1,
    // },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      // renderCell: (params) => <TimeAgo time={params.value} />,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   type: "number",
    //   flex: 1,
    //   shortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Button onClick={() => get_single_user(params.row.id)}>Edit</Button>
    //       </>
    //     );
    //   },
    // },
  ];

  const rows = [];
  if (Array.isArray(user)) {
    user.forEach((item, i) => {
      if (item.role === "admin") {
        rows.push({
          id: item.user_id,
          email: item.email,
          branch: item.branch === null ? "Not set" : item.branch,
          authorize: item.authorize,
          role: item.role,
          status: item.status,
        });
      }
    });
  }

  return (
    <Stack spacing={3}>
      <Edit_users
        alertColor={alertColor}
        setAlertColor={setAlertColor}
        open={open}
        setOpen={setOpen}
      />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Members</Typography>

          {/*   <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
           <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
            Import
          </Button>
            <Button
              color="inherit"
            
            >
              Add Branch
            </Button>
          </Stack>*/}
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
            onClick={() => setOpen(true)}
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
