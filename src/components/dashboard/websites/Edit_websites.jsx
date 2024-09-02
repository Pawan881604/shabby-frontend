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
} from "@mui/material";
import { PencilSimple } from "@phosphor-icons/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { Box, Stack } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import generateUuid from "../../../lib/Uuidv4";
import { Image_uploader } from "../../../components/common/Image_uploader";
import Image from "next/image";
import { getSiteURL } from "lib/get-site-url";
import { Transition } from "lib/healper";
import { showAlert } from "api/alert_action";
import { add_website, update_website } from "api/website";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Dscription is required" }),
  link: z.string().min(1, { message: "Website link is required" }),
  status: z.string().min(1, { message: "Status link is required" }),
});

export const Edit_websites = ({ open, setOpen, isvisible }) => {
  const [files, setFiles] = useState(null);
  const [show_image, setshow_image] = useState(true);
  const dispatch = useDispatch();
  const { website_details, success } = useSelector((state) => state.website);
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
      status: "Active",
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    if (!files && !isvisible) {
      dispatch(showAlert("Add another one image", "error"));
      return;
    }
    if (isvisible) {
      const image = files ? files : website_details.image._id;
      dispatch(update_website(data, image, website_details.website_id));
      handleClose();
      return;
    }
    const uuid = generateUuid();
    await dispatch(add_website(data, files, uuid));

    handleClose();
  };

  useEffect(() => {
    if (!isvisible) {
      setValue("title", "");
      setValue("link", "");
      setValue("description", "");
      setValue("status", "Active");
      setFiles(null);
    }
    if (success) {
      setValue("title", "");
      setValue("link", "");
      setValue("description", "");
      setValue("status", "Active");
      setFiles(null);
    }
    if (website_details) {
      setValue("title", website_details.title || "");
      setValue("link", website_details.link || "");
      setValue("status", website_details.status || "");
      setValue("description", website_details.discription || "");
    }
  }, [website_details, setValue, dispatch, success, isvisible]);

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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <FormHelperText>{errors.title.message}</FormHelperText>
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
                          src={`${getSiteURL()}${website_details?.image?.path}`}
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
