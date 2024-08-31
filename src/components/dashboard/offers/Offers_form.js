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
  Alert,
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
import { add_website, clearErrors, update_website } from "api/website";
import {
  ADD_WEBSITE_DETAILS_RESET,
  UPDATE_WEBSITE_DETAILS_RESET,
} from "lib/redux/constants/website_actionTypes";
import Image from "next/image";
import { getSiteURL } from "lib/get-site-url";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  discription: z.string().min(1, { message: "Discription is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  valid_date: z.string().min(1, { message: "valid_date is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Offers_form = ({
  open,
  setOpen,
  isvisible,
  setAlertColor,
  alertColor,
}) => {
  const [chipData, setChipData] = useState([]);
  const [files, setFiles] = useState(null);
  const [show_image, setshow_image] = useState(true);
  const [imgae_url, setimage_url] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const { loading_, website_details, success, update, error } = useSelector(
    (state) => state.website
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
      valid_date: "",
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const ids = chipData && chipData.map(item=>item.id)
    console.log(ids)

    // if (isvisible) {
    //   const image = files ? files : imgae_url;

    //   dispatch(update_website(data, image, website_details.website_id));
    //   handleClose();
    //   return;
    // }
    // const uuid = generateUuid();
    // await dispatch(add_website(data, files, uuid));

    // handleClose();
  };

//   useEffect(() => {
//     // if (error) {
//     //   setShowAlert(true);
//     //   setAlertMessage(error);
//     //   setAlertColor(false);
//     //   dispatch(clearErrors());
//     // }

//     // if (!isvisible) {
//     //   setValue("title", "");
//     //   setValue("discription", "");
//     //   setValue("status", "");
//     //   setValue("users", "");
//     //   setValue("valid_date", "");
//     //   setFiles(null);
//     //   setimage_url(null);
//     // }

//     // if (website_details) {
//     //   setValue("title", website_details.title || "");
//     //   setValue("discription", website_details.link || "");
//     //   setValue("status", website_details.status || "");
//     //   setValue("users", website_details.status || "");
//     //   setValue("valid_date", website_details.discription || "");
//     //   setimage_url(website_details.image || "");
//     // }

//     // if (success) {
//     //   setShowAlert(true);
//     //   setAlertColor(true);
//     //   setAlertMessage("Website details Added successfully!");
//     //   dispatch({ type: ADD_WEBSITE_DETAILS_RESET });
//     // }

//     // if (update) {
//     //   setShowAlert(true);
//     //   setAlertColor(true);
//     //   setAlertMessage("Website details updated successfully!");
//     //   dispatch({ type: UPDATE_WEBSITE_DETAILS_RESET });
//     // }
//   }, [website_details, setValue, update, dispatch, error, success, isvisible]);

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
    } // Add the selected value to the array
  };

  //   useMemo(() => {
  //     if (branch && Array.isArray(user_details?.branch)) {
  //       setChipData(
  //         branch
  //           .filter((item) => user_details.branch.includes(item.branch_id))
  //           .map((item) => ({ id: item.branch_id, name: item.branch }))
  //       );
  //     }
  //   }, [branch]);

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
              minWidth: "350px", // Make the dialog full width
              margin: "0px",
            },
          }}
        >
          <DialogTitle>
            <Stack spacing={1}>
              <Typography variant="h4">
                {isvisible ? "Update" : "Add new"} website
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {loading_ ? (
              <Loadin_section />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {showAlert && (
                  <Alert_
                    status={alertColor ? "success" : "error"}
                    setShowAlert={setShowAlert}
                    alertMessage={alertMessage}
                    showAlert={showAlert}
                  />
                )}
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
                          Site title
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Site title"
                          type="title"
                        />
                        {errors.title && (
                          <FormHelperText>
                            {errors.title.message}
                          </FormHelperText>
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
                          Site discription
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Site discription"
                          type="discription"
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
                          Site valid_date
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Site valid_date"
                          type="valid_date"
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
                          data.label === "React"
                            ? undefined
                            : handleDelete(data)
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
                        label="Choose branch"
                        inputProps={{
                          ...params.inputProps,
                          style: {
                            padding: "2px 4px", // Adjust padding as needed
                            fontSize: "12px", // Ensure the font size matches the above for consistency
                          },
                        }}
                      />
                    )}
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
                          <FormHelperText>
                            {errors.status.message}
                          </FormHelperText>
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
                              website_details?.image || ""
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
            )}
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
