"use client";

import React, { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useDispatch, useSelector } from "react-redux";
import { Edit_branch } from "../../../components/dashboard/branch/Edit_branch";
import { Data_grid_table } from "../../../lib/Data_grid_table.jsx";
import { Alert_ } from "styles/theme/alert";
import {
  clearErrors,
  get_all_branch,
  get_branch_details,
} from "../../../api/branchapi";
import {
  ADD_BRANCH_DETAILS_RESET,
  UPDATE_BRANCH_DETAILS_RESET,
} from "../../../lib/redux/constants/branch_actionTypes";
import { CircularProgress } from "@mui/material";
import { TimeAgo } from "lib/TimeAgo";

const Page = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  const [row_Per_page, setrow_Per_page] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    loading,
    branch,
    count_branch,
    resultPerpage,
    success,
    update,
    error,
  } = useSelector((state) => state.branch);
console.log(error)
  useEffect(() => {
    dispatch(get_all_branch(currentPage));
  }, [dispatch, currentPage]);

  const get_single_branch = async (branch_id) => {
  
    setLoadingStates((prevState) => ({ ...prevState, [branch_id]: true }));
    try {
      await dispatch(get_branch_details(branch_id));
      setOpen(true);
      setIsvisible(true);
    } catch (error) {
      dispatch(showAlert(error, "error"));
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [branch_id]: false }));
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "link",
        header: "Whatsapp Link",
        size: 150,
      },
      {
        accessorKey: "branch",
        header: "Branch",
        size: 150,
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
      },{
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
          const isLoading =
            loadingStates[row.original.branch_id] || false; // Get the loading state for this specific row
          return (
            <Button
              onClick={() => get_single_branch(row.original.branch_id)}
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

  const Show_form = () => {
    dispatch({ type: UPDATE_BRANCH_DETAILS_RESET });
    setOpen(true);
    setIsvisible(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Stack spacing={3}>
      <Edit_branch open={open} setOpen={setOpen} isvisible={isvisible} />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Branch</Typography>
        </Stack>
        <div>
          <Alert_
            success={success}
            update={update}
            error={error}
            clearErrors={clearErrors}
            add_reset={ADD_BRANCH_DETAILS_RESET}
            update_reset={UPDATE_BRANCH_DETAILS_RESET}
            get_data={get_all_branch}
            currentPage={currentPage}
            filter_1={""}
            setOpen={setOpen}
          />
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => Show_form()}
          >
            Add Branch
          </Button>
        </div>
      </Stack>

      <Data_grid_table
        apidata={branch && branch}
        columns={columns}
        loading={loading}
        totalPages={count_branch}
        pageSize={resultPerpage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        row_Per_page={row_Per_page}
        setrow_Per_page={setrow_Per_page}
      />
    </Stack>
  );
};

export default Page;
