"use client";
import React, { useEffect, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Box, Switch } from "@mui/material";
import { Data_grid_table } from "lib/Data_grid_table";
import { getSiteURL } from "lib/get-site-url";
import { Alert_ } from "styles/theme/alert";
import {
  clearErrors,
  get_all_offer_slider,
  update_offer_slider,
} from "api/offerapi";
import { TimeAgo } from "lib/TimeAgo";
import {
  ADD_OFFER_DETAILS_RESET,
  UPDATE_OFFER_DETAILS_RESET,
} from "lib/redux/constants/offer_actionTypes";

export const Offer_slider_list = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  const [row_Per_page, setrow_Per_page] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    loading,
    update,
    success,
    total_count,
    error,
    resultPerpage,
    offer_slider,
  } = useSelector((state) => state.offers_slider);

  const handleToggleChange = (status, id) => {
    dispatch(update_offer_slider(status, id));
  };




  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
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
          const id = row.original.slider_id;
          const status = row.original.status;
          return (
            <Box display="flex" alignItems="center">
              <Switch
                checked={row.original.status === "Active" ? true : false}
                onChange={() => handleToggleChange(status, id)}
              />
            </Box>
          );
        },
      },
    ],
    [loadingStates]
  );

  const handlePageChange = (pageNumber) => {
    dispatch(get_all_offer_slider(pageNumber));
    setCurrentPage(pageNumber);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Slider List</Typography>
        </Stack>
        <div>
          <Alert_
            success={success}
            update={update}
            error={error}
            clearErrors={clearErrors}
            add_reset={ADD_OFFER_DETAILS_RESET}
            update_reset={UPDATE_OFFER_DETAILS_RESET}
            get_data={get_all_offer_slider}
            currentPage={currentPage}
            filter_1={""}
            filter_2={""}
            setOpen={setOpen}
          />
        </div>
      </Stack>

      <Box
        sx={{
          // height: "450px",
          overflowY: "scroll",
        }}
      >
        <Data_grid_table
          apidata={offer_slider && offer_slider}
          columns={columns}
          loading={loading}
          totalPages={total_count}
          pageSize={resultPerpage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          row_Per_page={row_Per_page}
          setrow_Per_page={setrow_Per_page}
        />
      </Box>
    </Stack>
  );
};
