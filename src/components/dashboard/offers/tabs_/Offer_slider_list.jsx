"use client";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Box, Switch } from "@mui/material";
import { Data_grid_table } from "lib/Data_grid_table";
import { getSiteURL } from "lib/get-site-url";
import { Alert_ } from "styles/theme/alert";
import { clearErrors, update_offer_slider } from "api/offerapi";

export const Offer_slider_list = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, update,error, offer_slider } = useSelector(
    (state) => state.offers_slider
  );

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setAlertColor(false);
      setAlertMessage(error);
      dispatch(clearErrors());
    }

    if (update) {
      setShowAlert(true);
      setAlertMessage("Slider details updated successfully!");
    }
  }, [update, error]);

  const handleToggleChange = (status, id) => {
    dispatch(update_offer_slider(status, id));
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
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
              width={50}
              height={50}
              objectFit="cover"
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
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const id = params.row.id;
        const status = params.row.status;
        return (
          <Box display="flex" alignItems="center">
            <Switch
              checked={params.row.status === "Active" ? true : false}
              onChange={() => handleToggleChange(status, id)}
            />
          </Box>
        );
      },
    },
  ];

  const rows = [];
  if (Array.isArray(offer_slider)) {
    offer_slider.forEach((item, i) => {
      rows.push({
        id: item.slider_id,
        title: item.title,
        image: item.image && item.image.path,
        status: item.status,
      });
    });
  }

  const Show_form = () => {
    dispatch({ type: UPDATE_WEBSITE_DETAILS_RESET });
    setOpen(true);
    setIsvisible(false);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Slider List</Typography>
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
        </div>
      </Stack>

      <Box
        sx={{
          height: "450px",
          overflowY: "scroll",
        }}
      >
        <Data_grid_table rows={rows} columns={columns} loading={loading} />
      </Box>
    </Stack>
  );
};
