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
import { UPDATE_USER_DETAILS_RESET } from "lib/redux/constants/user_actionTypes";
import { Alert_ } from "styles/theme/alert";

const schema = z.object({
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,13}$/, { message: "Invalid phone number" }),
  branch: z.string().min(1, { message: "Branch is required" }),
  authorize: z.string().min(1, { message: "authorize is required" }),
  role: z.string().min(1, { message: "authorize is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Edit_customer = ({ open, setOpen }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const {
    loading_: user_details_loading,
    user_details,
    update,
    error,
  } = useSelector((state) => state.users);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      branch: "",
      authorize: "",
      role: "",
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    dispatch(update_user(data, user_details.user_id));
    handleClose();
  };

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setAlertMessage(error);
      dispatch(clearErrors());
    }
    if (user_details) {
      setValue("phone", user_details.phone_number || "");
      setValue(
        "branch",
        user_details.branch === null ? "Not set" : user_details.branch || "",
      );
      setValue("authorize", user_details.authorize || "");
      setValue("role", user_details.role || "");
    }
    if (update) {
      setShowAlert(true);
      setAlertMessage("User details updated successfully!");
      dispatch({ type: UPDATE_USER_DETAILS_RESET });
    }
  }, [user_details, setValue, update, dispatch, error]);

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
              <Typography variant="h4">Update new Customer</Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {user_details_loading ? (
              <Loadin_section />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {showAlert && (
                  <Alert_
                    status={"success"}
                    setShowAlert={setShowAlert}
                    alertMessage={alertMessage}
                    showAlert={showAlert}
                  />
                )}
                <Stack spacing={2}>
                  <Controller
                    control={control}
                    name="phone"
                    // disabled={true}
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.phone)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          Phone number
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          disabled={true}
                          label="phone address"
                          type="phone"
                        />
                        {errors.phone && (
                          <FormHelperText>
                            {errors.phone.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Stack>
                <Controller
                  control={control}
                  name="branch"
                  render={({ field }) => (
                    <FormControl
                      style={{ marginTop: "10px", width: "100%" }}
                      error={Boolean(errors.branch)}
                    >
                      <InputLabel sx={{ fontSize: "13px" }}>Branch</InputLabel>
                      <Select
                        style={{ top: "6px", padding: "0px", fontSize: "12px" }}
                        {...field}
                        label="Branch"
                        inputProps={{
                          sx: { padding: "10px", fontSize: "14px" },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              fontSize: "14px",
                              maxHeight: 200,
                              overflow: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Select a branch</MenuItem>
                        <MenuItem value="branch1">Branch 1</MenuItem>
                        <MenuItem value="branch2">Branch 2</MenuItem>
                        <MenuItem value="branch3">Branch 3</MenuItem>
                      </Select>
                      {errors.branch && (
                        <FormHelperText>{errors.branch.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="authorize"
                  render={({ field }) => (
                    <FormControl
                      style={{ marginTop: "15px", width: "100%" }}
                      error={Boolean(errors.authorize)}
                    >
                      <InputLabel sx={{ fontSize: "13px" }}>
                        Authorize
                      </InputLabel>
                      <Select
                        style={{ top: "6px", padding: "0px", fontSize: "12px" }}
                        {...field}
                        label="Authorize"
                        inputProps={{
                          sx: { padding: "10px", fontSize: "14px" },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              fontSize: "14px",
                              maxHeight: 200,
                              overflow: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Select a options</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                      {errors.authorize && (
                        <FormHelperText>
                          {errors.authorize.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <FormControl
                      style={{ marginTop: "15px", width: "100%" }}
                      error={Boolean(errors.role)}
                    >
                      <InputLabel sx={{ fontSize: "13px" }}>
                        User Roll
                      </InputLabel>
                      <Select
                        style={{ top: "6px", padding: "0px", fontSize: "12px" }}
                        {...field}
                        label="User Roll"
                        inputProps={{
                          sx: { padding: "10px", fontSize: "14px" },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              fontSize: "14px",
                              maxHeight: 200,
                              overflow: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Select a options</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                      </Select>
                      {errors.role && (
                        <FormHelperText>{errors.role.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
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
