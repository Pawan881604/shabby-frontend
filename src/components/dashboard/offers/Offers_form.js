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
  Paper,
  Chip,
  List,
  ListItemButton,
  ListItemText,
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
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useMemo, useState } from "react";
import generateUuid from "../../../lib/Uuidv4";

import { Image_uploader } from "../../../components/common/Image_uploader";

import Image from "next/image";
import { getSiteURL } from "lib/get-site-url";
import { add_offer, get_offer_details, update_offer } from "api/offerapi";
import { get_all_users, search_all_user } from "api/authapi";
import { showAlert } from "api/alert_action";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  discription: z.string().min(1, { message: "Discription is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  valid_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Offers_form = ({ open, setOpen, isvisible }) => {
  const [chipData, setChipData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [imgae_id, setImage_id] = useState([]);
  const [files, setFiles] = useState(null);
  const [show_image, setshow_image] = useState(true);
  const { offer_data, success, offer_details } = useSelector(
    (state) => state.offers
  );

  const { search_data } = useSelector((state) => state.search);
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
      status: "Active",
      valid_date: new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    if (!isvisible) {
      setValue("title", "");
      setValue("discription", "");
      setValue("status", "Active");
      setValue("valid_date", new Date().toISOString().slice(0, 10));
      setFiles(null);
      setImage_id(null);
    }
    if (success) {
      setValue("title", "");
      setValue("discription", "");
      setValue("status", "Active");
      setFiles(null);
      setChipData([]);
      setImage_id(null);
    }
    if (offer_details) {
      let validDate = offer_details.valid_date;

      // Try to parse the date, or use a fallback date (e.g., today's date) if invalid
      if (validDate) {
        const parsedDate = new Date(validDate);
        if (!isNaN(parsedDate.getTime())) {
          validDate = parsedDate.toISOString().slice(0, 10);
        } else {
          console.warn("Invalid date value provided. Using default date.");
          validDate = new Date().toISOString().slice(0, 10); // Fallback to today's date
        }
      } else {
        validDate = new Date().toISOString().slice(0, 10); // Fallback to today's date
      }
      setValue("valid_date", validDate);
      setValue("title", offer_details.title || "");
      setValue("discription", offer_details.discription || "");
      setValue("status", offer_details.status || "");
      setChipData(offer_details.applicable_users || []);
      setImage_id(offer_details.image?._id);
    }
  }, [offer_details, setValue, success, dispatch, isvisible]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const ids = chipData && chipData.map((item) => item._id);
    
    if (!files  && !isvisible) {
      dispatch(showAlert("Add another one image", "error"));
      return;
    }
    if (isvisible) {
      const image = files ? files : offer_details.image._id;
      
      dispatch(
        update_offer(data, ids, image, offer_details._id)
      );
      return;
    }
    const uuid = generateUuid();
    await dispatch(add_offer(data, ids, files, uuid));
  };

  const handleInputChange = (event) => {
    const trimmedValue = event.target.value.trim();
    setSearchQuery(trimmedValue);
    dispatch(search_all_user(1, "user", trimmedValue));
  };
  const handleDelete = (chipToDelete) => {
    setChipData((chips) =>
      chips.filter((chip) => chip._id !== chipToDelete._id)
    );
  };
  const get_user_id = (data) => {
    setChipData((prev) => {
      const isExist = prev.some((item) => item._id === data._id);
      if (!isExist) {
        return [data, ...prev];
      }
      return prev;
    });
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
              <Stack spacing={2}>
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
                  {search_data &&
                    search_data.map((data) => (
                      <Chip
                        key={data._id}
                        label={data.phone_number}
                        onDelete={() => handleDelete(data)}
                      />
                    ))}
                </Paper>

                <Box sx={{ width: "100%" }}>
                  <FormControl sx={{ marginTop: "13px", width: "100%" }}>
                    <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                      Search user
                    </InputLabel>
                    <OutlinedInput
                      inputProps={{
                        style: { padding: "10px", fontSize: "12px" },
                      }}
                      label=" Search user"
                      type="search"
                      value={searchQuery}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  {search_data.length > 0 ? (
                    <Box
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                        overflowY: "scroll",
                        maxHeight: "350px",
                      }}
                    >
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          fontSize: "12px !important",
                          bgcolor: "background.paper",
                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                      >
                        {search_data.map((item, i) => (
                          <ListItemButton
                            style={{ fontSize: "12px ", padding: "2px 10px" }}
                            key={i}
                            onClick={() => get_user_id(item)}
                          >
                            <ListItemText
                              secondary={
                                <Typography
                                  component="span"
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    display: "inline",
                                  }}
                                >
                                  {item.phone_number}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Box>
                  ) : null}
                </Box>
              </Stack>
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
                          src={`${getSiteURL()}${
                            offer_details?.image?.path || ""
                          }`}
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
