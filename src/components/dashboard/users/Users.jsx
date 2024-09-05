"use client";
import React, { useEffect, useMemo, useState } from "react";
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

import { Alert_ } from "styles/theme/alert";
import { TimeAgo } from "lib/TimeAgo";
import {
  ADD_USER_RESET,
  UPDATE_USER_DETAILS_RESET,
} from "lib/redux/constants/user_actionTypes";
import { CircularProgress } from "@mui/material";
import { Edit_users } from "./Edit_users";
import { Data_grid_table } from "lib/Data_grid_table";
const Users = () => {
  const dispatch = useDispatch();
  const [loadingStates, setLoadingStates] = useState({});
  const [row_Per_page, setrow_Per_page] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(false);
  const { loading, user, success, count_users, resultPerpage, update, error } =
    useSelector((state) => state.users);

  useEffect(() => {
    dispatch(get_all_users(currentPage, "admin", "manager"));
  }, [dispatch, currentPage]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },

      {
        accessorKey: "user.role",
        header: "User role",
        size: 150,
        Cell: ({ row }) => {
          const role = row.original.role;
          return (
            <div
              style={{
                color: role !== "admin" ? "orange" : "green",
                fontWeight: 600,
              }}
            >
              {role}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ row }) => {
          const status = row.original.status;
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
        accessorKey: "update_at",
        header: "Last Update",
        flex: 1,
        Cell: ({ row }) => {
          const updated_at = row.original.update_at;
          const created_at = row.original.create_at;
          return (
            <TimeAgo time={updated_at !== null ? updated_at : created_at} />
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          const isLoading = loadingStates[row.original.user_id] || false; // Get the loading state for this specific row
          return (
            <Button
              onClick={() => get_single_user(row.original.user_id)}
              color="secondary"
              disabled={isLoading} // Disable only if this row is loading
            >
              {isLoading ? <CircularProgress size={24} /> : "Edit"}
            </Button>
          );
        },
      },
    ],
    [loadingStates]
  );

  const get_single_user = async (user_id) => {
    setLoadingStates((prevState) => ({ ...prevState, [user_id]: true }));

    try {
      await dispatch(get_user_details(user_id));
      setOpen(true);
      setIsvisible(true);
    } catch (error) {
      dispatch(showAlert(error, "error"));
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [user_id]: false }));
    }
  };

  const Show_form = () => {
    dispatch({ type: UPDATE_USER_DETAILS_RESET });
    setOpen(true);
    setIsvisible(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Stack spacing={3}>
      <Edit_users open={open} isvisible={isvisible} setOpen={setOpen} />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Shabby members</Typography>
        </Stack>
        <div>
          <Alert_
            success={success}
            update={update}
            error={error}
            clearErrors={clearErrors}
            add_reset={ADD_USER_RESET}
            update_reset={UPDATE_USER_DETAILS_RESET}
            get_data={get_all_users}
            currentPage={currentPage}
            filter_1={"admin"}
            filter_2={"manager"}
            setOpen={setOpen}
          />
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => Show_form()}
          >
            Add Member
          </Button>
        </div>
      </Stack>
      <Data_grid_table
        apidata={user && user}
        columns={columns}
        loading={loading}
        totalPages={count_users}
        pageSize={resultPerpage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        row_Per_page={row_Per_page}
        setrow_Per_page={setrow_Per_page}
      />
    </Stack>
  );
};

export default Users;
