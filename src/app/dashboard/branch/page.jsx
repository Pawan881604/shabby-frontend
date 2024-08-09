"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users, get_user_details } from "../../../api/authapi";
import { Edit_branch } from "../../../components/dashboard/branch/Edit_branch";
import { Data_grid_table } from "../../../lib/Data_grid_table.jsx";
import { UPDATE_USER_DETAILS_RESET } from "../../../lib/redux/constants/user_actionTypes";
import { Alert_ } from "styles/theme/alert";
import { get_all_branch, get_branch_details } from "../../../api/branchapi";
import { ADD_BRANCH_DETAILS_RESET, UPDATE_BRANCH_DETAILS_RESET } from "../../../lib/redux/constants/branch_actionTypes";

const Page = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, branch, success, update, error } = useSelector(
    (state) => state.branch,
  );
  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(true);

  useEffect(() => {
    dispatch(get_all_branch());
    if (error) {
      setShowAlert(true);
      setAlertMessage(error);
      dispatch(clearErrors());
    }
    if (success) {
      setShowAlert(true);
      setAlertMessage("Branch details Added successfully!");
      dispatch({ type: ADD_BRANCH_DETAILS_RESET });
    }
    if (update) {
      setShowAlert(true);
      setAlertMessage("User details updated successfully!");
      dispatch({ type: UPDATE_USER_DETAILS_RESET });
    }
  }, [dispatch, update, success, error]);

  const get_single_branch = async (branch_id) => {
    await dispatch(get_branch_details(branch_id));
    setOpen(true);
    setIsvisible(true);
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
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      maxWidth: 300,
      flex: 1,
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
            <Button onClick={() => get_single_branch(params.row.id)}>
              Edit
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  if (Array.isArray(branch)) {
    branch.forEach((item, i) => {
      rows.push({
        id: item.branch_id,
        phone: item.phone_number,
        branch: item.branch,
        // no_users: item.branch,
        status: item.status,
      });
    });
  }

  const Show_form = () => {
    dispatch({ type: UPDATE_BRANCH_DETAILS_RESET });
    setOpen(true);
    setIsvisible(false);
  };

  return (
    <Stack spacing={3}>
      <Edit_branch open={open} setOpen={setOpen} isvisible={isvisible} />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Branch</Typography>

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
              status={"success"}
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
            Add Branch
          </Button>
        </div>
      </Stack>
      {/* <CustomersFilters />*/}
      <Data_grid_table rows={rows} columns={columns} loading={loading} />
    </Stack>
  );
};

export default Page;
