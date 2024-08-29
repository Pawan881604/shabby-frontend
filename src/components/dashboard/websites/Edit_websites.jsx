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
  description: z.string().min(1, { message: "Dscription is required" }),
  link: z.string().min(1, { message: "Website link is required" }),
  status:z.string().min(1, { message: "Status link is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Edit_websites = ({
  open,
  setOpen,
  isvisible,
  setAlertColor,
  alertColor,
}) => {
  const [files, setFiles] = useState(null);
  const [show_image, setshow_image] = useState(true);
  const [imgae_url, setimage_url] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const { loading_, website_details, success, update, error } = useSelector(
    (state) => state.website
  );
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      status:"",
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    if (isvisible) {
      const image = files?files:imgae_url
     
      dispatch(update_website(data, image, website_details.website_id));
      handleClose();
      return;
    }
    const uuid = generateUuid();
    await dispatch(add_website(data, files, uuid));

    handleClose();
  };

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setAlertMessage(error);
      setAlertColor(false);
      dispatch(clearErrors());
    }

    if (!isvisible) {
      setValue("title", "");
      setValue("link", "");
      setValue("description", "");
      setValue("status", "");
      setFiles(null);
      setimage_url(null)
    }

    if (website_details) {
      setValue("title", website_details.title || "");
      setValue("link", website_details.link || "");
      setValue("status", website_details.status || "");
      setValue("description", website_details.discription || "");
        setimage_url(website_details.image || "")
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
  }, [website_details, setValue, update, dispatch, error, success, isvisible]);

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
                    // disabled={true}
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
                    name="description"
                    // disabled={true}
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.description)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          Site description
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Site description"
                          type="description"
                        />
                        {errors.description && (
                          <FormHelperText>
                            {errors.description.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Controller
                    control={control}
                    name="link"
                    // disabled={true}
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.link)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          Site Link
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Site Link"
                          type="link"
                        />
                        {errors.link && (
                          <FormHelperText>{errors.link.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
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
