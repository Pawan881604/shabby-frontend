"use client";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useDispatch, useSelector } from "react-redux";
import { Edit_websites } from "../../../components/dashboard/websites/Edit_websites";
import { Data_grid_table } from "../../../lib/Data_grid_table.jsx";
import { Alert_ } from "styles/theme/alert";
import { clearErrors, get_all_website, get_website_details } from "api/website";
import Image from "next/image";
import { getSiteURL } from "lib/get-site-url";
import {
  ADD_WEBSITE_DETAILS_RESET,
  UPDATE_WEBSITE_DETAILS_RESET,
} from "lib/redux/constants/website_actionTypes";
import { CircularProgress } from "@mui/material";
import { showAlert } from "api/alert_action";

const Page = () => {
  const dispatch = useDispatch();
  const [loadingStates, setLoadingStates] = useState({});
  const [row_Per_page, setrow_Per_page] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage)
  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(false);
  const {
    loading,
    count_website,
    website,
    resultPerpage,
    success,
    update,
    error,
  } = useSelector((state) => state.website);

  useEffect(() => {
    dispatch(get_all_website(currentPage));
  }, [dispatch, currentPage, row_Per_page]);

  const get_single_website = async (website_id) => {
    setLoadingStates((prevState) => ({ ...prevState, [website_id]: true }));
    try {
      await dispatch(get_website_details(website_id));
      setOpen(true);
      setIsvisible(true);
    } catch (error) {
      dispatch(showAlert(error, "error"));
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [website_id]: false }));
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "link",
        header: "Website Url",
        size: 150,
      },
      {
        accessorKey: "image",
        header: "Image",
        size: 150,
        Cell: ({ row }) => {
          const imageUrl = `${getSiteURL()}${row.original.image.path}`;
          return (
            <Image
              src={imageUrl}
              alt="Image"
              width={50}
              height={50}
              objectFit="cover"
            />
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
        accessorKey: "action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          const isLoading = loadingStates[row.original.website_id] || false; // Get the loading state for this specific row
          return (
            <Button
              onClick={() => get_single_website(row.original.website_id)}
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
    if (isvisible) {
      dispatch({ type: UPDATE_WEBSITE_DETAILS_RESET });
    }
    setOpen(true);
    setIsvisible(false);
  };

  const handlePageChange = (pageNumber) => {
  
    setCurrentPage(pageNumber);
  };

  return (
    <Stack spacing={3}>
      <Edit_websites open={open} isvisible={isvisible} setOpen={setOpen}/>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Website List</Typography>
        </Stack>
        <div>
        
            <Alert_
              success={success}
              update={update}
              error={error}
              clearErrors={clearErrors}
              add_reset={ADD_WEBSITE_DETAILS_RESET}
              update_reset={UPDATE_WEBSITE_DETAILS_RESET}
              get_data={get_all_website}
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
        apidata={website && website}
        columns={columns}
        loading={loading}
        totalPages={count_website}
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
