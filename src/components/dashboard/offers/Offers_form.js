"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  TextField,
  Paper,
  Chip,
  Autocomplete,
} from "@mui/material";
import { PencilSimple } from "@phosphor-icons/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { Box, Stack } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Loadin_section } from "../../../lib/Loadin_section";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useState } from "react";
import { Alert_ } from "styles/theme/alert";
import generateUuid from "../../../lib/Uuidv4";

import { Image_uploader } from "../../../components/common/Image_uploader";

import Image from "next/image";
import { getSiteURL } from "lib/get-site-url";
import { add_offer } from "api/offerapi";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  discription: z.string().min(1, { message: "Discription is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  valid_date: z.string().min(1, { message: "valid_date is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Offers_form = ({ open, setOpen, isvisible }) => {
  const [chipData, setChipData] = useState([]);
  const [files, setFiles] = useState(null);
  const [show_image, setshow_image] = useState(true);
  const [imgae_url, setimage_url] = useState(null);

  const dispatch = useDispatch();
  const { loading, offer_data, success, update, error } = useSelector(
    (state) => state.offers
  );
  const { user } = useSelector((state) => state.users);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      discription: "",
      users: "",
      status: "",
      // valid_date: new Date().toISOString().slice(0, 10),
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const ids = chipData && chipData.map((item) => item.id);

    // if (isvisible) {
    //   const image = files ? files : imgae_url;

    //   dispatch(update_website(data, image, offer_data.website_id));
    //   handleClose();
    //   return;
    // }
    const uuid = generateUuid();
    await dispatch(add_offer(data, ids, files, uuid));

    // handleClose();
  };

  useEffect(() => {
    if (!isvisible) {
      setValue("title", "");
      setValue("discription", "");
      setValue("status", "");
      setValue("users", "");
      setValue("valid_date", new Date().toISOString().slice(0, 10));
      setFiles(null);
      setimage_url(null);
    }
    if (offer_data) {
      setValue("title", offer_data.title || "");
      setValue("discription", offer_data.link || "");
      setValue("status", offer_data.status || "");
      setValue("users", offer_data.status || "");
      setValue("valid_date", offer_data.discription || "");
      setimage_url(offer_data.image || "");
    }
  }, [offer_data, setValue, dispatch, isvisible]);

  const active_users = Array.isArray(user)
    ? user
        .filter((item) => item.role === "user" && item.status === "Active")
        .map((item) => ({ id: item._id, name: item.phone_number }))
    : [];

  const handleDelete = (ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== ChipData.id));
  };

  const user_onchange_handler = (e, newValue) => {
    const exists = chipData.some((item) => item.id === newValue.id);

    if (!exists) {
      setChipData((prev) => [newValue, ...prev]);
    }
  };

  return (
    <>
      <Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          className="add-cus"
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            style: {
              justifyContent: "flex-end",
              minWidth: "350px",
              margin: "0px",
            },
          }}
        >
          <DialogTitle>
            <Stack spacing={1}>
              <Typography variant="h4">
                {isvisible ? "Update" : "Add new"} Offer
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormControl
                      sx={{ marginTop: "13px" }}
                      error={Boolean(errors.title)}
                    >
                      <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                        Title
                      </InputLabel>
                      <OutlinedInput
                        inputProps={{
                          style: { padding: "10px", fontSize: "12px" },
                        }}
                        {...field}
                        label="Title"
                        type="text"
                      />
                      {errors.title && (
                        <FormHelperText>{errors.title.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="discription"
                  render={({ field }) => (
                    <FormControl
                      sx={{ marginTop: "13px" }}
                      error={Boolean(errors.discription)}
                    >
                      <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                        Discription
                      </InputLabel>
                      <OutlinedInput
                        inputProps={{
                          style: { padding: "10px", fontSize: "12px" },
                        }}
                        {...field}
                        label="Discription"
                        type="text"
                      />
                      {errors.discription && (
                        <FormHelperText>
                          {errors.discription.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>

              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="valid_date"
                  render={({ field }) => (
                    <FormControl
                      sx={{ marginTop: "13px" }}
                      error={Boolean(errors.valid_date)}
                    >
                      <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                        Valid Date
                      </InputLabel>
                      <OutlinedInput
                        inputProps={{
                          style: { padding: "10px", fontSize: "12px" },
                        }}
                        {...field}
                        label="Valid Date"
                        type="date"
                      />
                      {errors.valid_date && (
                        <FormHelperText>
                          {errors.valid_date.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
              <Paper
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                  listStyle: "none",
                  maxWidth: "350px",
                  p: 0.8,
                }}
                component="div"
              >
                {chipData &&
                  chipData.map((data) => (
                    <Chip
                      key={data.id}
                      label={data.name}
                      onDelete={
                        data.label === "React" ? undefined : handleDelete(data)
                      }
                    />
                  ))}
              </Paper>

              <Box sx={{ width: "100%" }}>
                <Autocomplete
                  sx={{ width: "100%" }}
                  autoHighlight
                  options={active_users}
                  getOptionLabel={(option) => option?.name || ""} // Handle missing or undefined name
                  onChange={(event, newValue) =>
                    user_onchange_handler(event, newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        style: { fontSize: "13px", top: "-6px" },
                      }}
                      label="Optional"
                      inputProps={{
                        ...params.inputProps,
                        style: {
                          padding: "2px 4px", // Adjust padding as needed
                          fontSize: "12px", // Ensure the font size matches the above for consistency
                        },
                      }}
                    />
                  )}
                  ListboxProps={{
                    sx: {
                      fontSize: "12px", // Set the font size for the options
                    },
                  }}
                />
              </Box>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormControl
                      sx={{ marginTop: "13px" }}
                      error={Boolean(errors.status)}
                    >
                      <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                        Status
                      </InputLabel>
                      <Select
                        {...field}
                        label="Status"
                        sx={{
                          ".MuiSelect-select": {
                            padding: "8px 10px",
                            fontSize: "12px",
                          },
                        }}
                      >
                        <MenuItem value="Active" sx={{ fontSize: "12px" }}>
                          Active
                        </MenuItem>
                        <MenuItem value="Inactive" sx={{ fontSize: "12px" }}>
                          Inactive
                        </MenuItem>
                      </Select>
                      {errors.status && (
                        <FormHelperText>{errors.status.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>

              <Stack spacing={2} style={{ marginTop: 15 }}>
                {isvisible ? (
                  <div style={{ position: "relative", paddingTop: 10 }}>
                    {show_image ? (
                      <div>
                        <Image
                          src={`${getSiteURL()}${offer_data?.image || ""}`}
                          alt="Image"
                          width={100} // Adjust the width as per your requirement
                          height={100} // Adjust the height as per your requirement
                          objectFit="cover" // Optional, to control how the image fits within the dimensions
                        />
                      </div>
                    ) : (
                      <Image_uploader setFiles={setFiles} />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "-10px",
                        cursor: "pointer",
                      }}
                    >
                      <PencilSimple
                        onClick={() => setshow_image(!show_image)}
                        size={22}
                      />
                    </div>
                  </div>
                ) : (
                  <Image_uploader setFiles={setFiles} />
                )}
              </Stack>

              <Button
                sx={{
                  padding: "5px 10px",
                  marginTop: "15px",
                  fontSize: "14px",
                }}
                type="submit"
                variant="contained"
              >
                Add New
              </Button>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
