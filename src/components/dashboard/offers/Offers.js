"use client";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users } from "../../../api/authapi";
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
import { CircularProgress } from "@mui/material";
import { showAlert } from "api/alert_action";

export const Offers = () => {
  const dispatch = useDispatch();
  const [loadingStates, setLoadingStates] = useState({});
  const [row_Per_page, setrow_Per_page] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(false);
  const {
    loading,
    offer_data,
    total_count,
    resultPerpage,
    success,
    update,
    error,
  } = useSelector((state) => state.offers);

  useEffect(() => {

    dispatch(get_all_offer());
  }, [dispatch]);

  const get_single_offer = async (offer_id) => {
    setLoadingStates((prevState) => ({ ...prevState, [offer_id]: true }));

    try {
      await dispatch(get_offer_details(offer_id));
      setOpen(true);
      setIsvisible(true);
    } catch (error) {
      dispatch(showAlert(error, "error"));
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [offer_id]: false }));
    }
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "discription",
        header: "Discription Url",
        size: 150,
      },
      {
        accessorKey: "valid_date",
        header: "Validity date",
        size: 150,
        Cell: ({ row }) => {
          const date = row.original.valid_date;
          return (
            <div>
              <TimeAndDate time={date} />
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
        accessorKey: "image",
        header: "Image",
        size: 150,
        Cell: ({ row }) => {
          const imageUrl = `${getSiteURL()}${row.original.image.path}`;
          return (
            <div>
              <Image
                src={imageUrl}
                alt="Image"
                width={50}
                height={50}
                objectFit="cover"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          const isLoading = loadingStates[row.original.offer_id] || false; // Get the loading state for this specific row
          return (
            <Button
              onClick={() => get_single_offer(row.original.offer_id)}
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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Stack spacing={3}>
      <Offers_form open={open} isvisible={isvisible} setOpen={setOpen} />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Offers List</Typography>
        </Stack>

        <div>
          <Alert_
            success={success}
            update={update}
            error={error}
            clearErrors={clearErrors}
            add_reset={ADD_OFFER_DETAILS_RESET}
            update_reset={UPDATE_OFFER_DETAILS_RESET}
            get_data={get_all_offer}
            currentPage={currentPage}
            filter_1={""}
            filter_2={""}
            setOpen={setOpen}
          />
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => Show_form()}
          >
            Add Customer
          </Button>
        </div>
      </Stack>

      <Data_grid_table
        apidata={offer_data && offer_data}
        columns={columns}
        loading={loading}
        totalPages={total_count}
        pageSize={resultPerpage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        row_Per_page={row_Per_page}
        setrow_Per_page={setrow_Per_page}
      />
    </Stack>
  );
};
