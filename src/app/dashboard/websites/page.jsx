"use client";
import React, { useEffect, useState } from "react";
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

const Page = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const {
    loading,
    website,
    count_website,
    resultPerpage,
    success,
    update,
    error,
  } = useSelector((state) => state.website);
  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(false);

  useEffect(() => {
    dispatch(get_all_website());
    if (error) {
      setShowAlert(true);
      setAlertColor(false);
      setAlertMessage(error);
      dispatch(clearErrors());
    }
    if (success) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("Website details Added successfully!");
      dispatch({ type: ADD_WEBSITE_DETAILS_RESET });
    }

    if (update) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("Website details updated successfully!");
      dispatch({ type: UPDATE_WEBSITE_DETAILS_RESET });
    }
  }, [dispatch, update, success, error]);

  const get_single_website = async (website_id) => {
    setLoadingStates((prevState) => ({ ...prevState, [website_id]: true }));

    try {
      await dispatch(get_website_details(website_id));
      setOpen(true);
      setIsvisible(true);
    } catch (error) {
      setShowAlert(true);
      setAlertColor(false);
      setAlertMessage(error);
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [website_id]: false }));
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "link",
      headerName: "Website Url",
      flex: 1,
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => {
        const imageUrl = `${getSiteURL()}${params.row.image}`;
        return (
          <>
            <Image
              src={imageUrl}
              alt="Image"
              width={50} // Adjust the width as per your requirement
              height={50} // Adjust the height as per your requirement
              objectFit="cover" // Optional, to control how the image fits within the dimensions
            />
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      maxWidth: 300,
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
      field: "action",
      headerName: "Action",
      type: "number",
      flex: 1,
      shortable: false,
      renderCell: (params) => {
        const isLoading = loadingStates[params.row.id] || false; // Get the loading state for this specific row
        return (
          <Button
            onClick={() => get_single_website(params.row.id)}
            color="secondary"
            disabled={isLoading} // Disable only if this row is loading
          >
            {isLoading ? <CircularProgress size={24} /> : "Edit"}
          </Button>
        );
      },
    },
  ];

  const rows = [];
  if (Array.isArray(website)) {
    website.forEach((item, i) => {
      rows.push({
        id: item.website_id,
        title: item.title,
        link: item.link,
        image: item.image?.path,
        // no_users: item.branch,
        status: item.status,
      });
    });
  }

  const Show_form = () => {
    if (isvisible) {
      dispatch({ type: UPDATE_WEBSITE_DETAILS_RESET });
    }
    setOpen(true);
    setIsvisible(false);
  };

  return (
    <Stack spacing={3}>
      <Edit_websites
        open={open}
        setAlertColor={setAlertColor}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
        setOpen={setOpen}
        isvisible={isvisible}
      />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Website List</Typography>
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
            Add Branch
          </Button>
        </div>
      </Stack>
      {/* <CustomersFilters />*/}
      <Data_grid_table
        rows={rows}
        columns={columns}
        loading={loading}
       
        totalPages={count_website}
        pageSize={resultPerpage}
      />
    </Stack>
  );
};

export default Page;
