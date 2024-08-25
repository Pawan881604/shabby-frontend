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
import { clearErrors, update_user } from "api/authapi";
import { Alert_ } from "styles/theme/alert";
import { add_branch, update_branch } from "../../../api/branchapi";
import generateUuid from "../../../lib/Uuidv4";

import {
  ADD_BRANCH_DETAILS_RESET,
  UPDATE_BRANCH_DETAILS_RESET,
} from "lib/redux/constants/branch_actionTypes";
import { Image_uploader } from "../../../components/common/Image_uploader";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Dscription is required" }),
  link: z.string().min(1, { message: "Website link is required" }),
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
  console.log(files);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const { loading_, branch_details, success, update, error } = useSelector(
    (state) => state.branch
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
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    if (isvisible) {
      dispatch(update_branch(data, branch_details.branch_id));
      handleClose();
      return;
    }
    const uuid = generateUuid();
    await dispatch(add_branch(data, uuid));

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
      setValue("link", "");
      setValue("branch", "");
    }
    // if (branch_details) {
    //   setValue("link", branch_details.link || "");
    //   setValue(
    //     "branch",
    //     branch_details.branch === null ? "Not set" : branch_details.branch || ""
    //   );
    // }
    if (success) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("Branch details Added successfully!");
      dispatch({ type: ADD_BRANCH_DETAILS_RESET });
    }
    if (update) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("Branch details updated successfully!");
      dispatch({ type: UPDATE_BRANCH_DETAILS_RESET });
    }
  }, [branch_details, setValue, update, dispatch, error, success, isvisible]);

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

                <Stack spacing={2} style={{ marginTop: 15 }}>
                  <Image_uploader setFiles={setFiles} />
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
