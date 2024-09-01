"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users, get_user_details } from "../../../api/authapi";
import { Data_grid_table } from "../../../lib/Data_grid_table.jsx";
import { Alert_ } from "styles/theme/alert";
import { Offers_form } from "./Offers_form";
import { clearErrors, get_all_offer, get_offer_details } from "api/offerapi";
import {
  ADD_OFFER_DETAILS_RESET,
  UPDATE_OFFER_DETAILS_RESET,
} from "lib/redux/constants/offer_actionTypes";
import { getSiteURL } from "lib/get-site-url";
import Image from "next/image";
import TimeAndDate from "lib/Date_formet";

export const Offers = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, offer_data, success, update, error } = useSelector(
    (state) => state.offers
  );

  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(true);

  useEffect(() => {
    dispatch(get_all_users());
    dispatch(get_all_offer());
    if (error) {
      setShowAlert(true);
      setAlertColor(false);
      setAlertMessage(error);
      dispatch(clearErrors());
    }
    if (success) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("Offer added successfully!");
      dispatch(get_all_offer());
      dispatch({ type: ADD_OFFER_DETAILS_RESET });
    }
    if (update) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("User details updated successfully!");
      dispatch({ type: UPDATE_OFFER_DETAILS_RESET });
    }
  }, [dispatch, error, success, update]);

  const get_single_user = async (user_id) => {
    await dispatch(get_offer_details(user_id));
    setOpen(true);
    setIsvisible(true);
  };
  const Show_form = () => {
    if (isvisible) {
      dispatch({ type: UPDATE_OFFER_DETAILS_RESET });
    }
    setOpen(true);
    setIsvisible(false);
  };
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "discription",
      headerName: "Discription",
      flex: 1,
    },

    {
      field: "valid_date",
      headerName: "Valid",
      flex: 1,
      renderCell: (params) => {
        const date = params.row.valid_date;
        return (
          <div>
            <TimeAndDate time={date} />
          </div>
        );
      },
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
  if (Array.isArray(offer_data)) {
    offer_data.forEach((item, i) => {
      rows.push({
        id: item.offer_id,
        title: item.title,
        discription: item.discription,
        valid_date: item.valid_date,
        image: item.image && item.image.path,
        status: item.status,
      });
    });
  }

  return (
    <Stack spacing={3}>
      <Offers_form
        open={open}
        isvisible={isvisible}
        setOpen={setOpen}
        setShowAlert={setShowAlert}
        setAlertColor={setAlertColor}
        setAlertMessage={setAlertMessage}
      />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Offers List</Typography>
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
  );
};
