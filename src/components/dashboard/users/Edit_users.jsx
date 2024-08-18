"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
  Alert,
  Autocomplete,
  TextField,
  Paper,
  Chip,
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
import { forwardRef, useEffect, useMemo, useState } from "react";
import { ADD_user, clearErrors } from "../../../api/authapi";
import { ADD_USER_RESET, UPDATE_USER_DETAILS_RESET } from "../../../lib/redux/constants/user_actionTypes";
import { Alert_ } from "styles/theme/alert";
import { get_all_branch } from "../../../api/branchapi";
import generateUuid from "../../../lib/Uuidv4";
const schema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Edit_users = ({ open, setOpen, setAlertColor, alertColor }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const {
    loading_: user_details_loading,
   success,
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
      email: "",
      password: "",
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const uuid = generateUuid();
    dispatch(ADD_user(data,uuid));
    handleClose();
  };

  useEffect(() => {
    dispatch(get_all_branch());
    if (error) {
      setShowAlert(true);
      setAlertColor(false);
      setAlertMessage(error);   
      dispatch(clearErrors());
    }
    if (success) {
        setShowAlert(true);
        setAlertColor(true);
        setValue("email", "");
        setValue("password", "");
        setAlertMessage("User add successfully!");
        dispatch({ type: ADD_USER_RESET });
      }

  }, [ setValue, success, dispatch, error]);

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
              <Typography variant="h4">Add new User</Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {user_details_loading ? (
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
                    name="email"
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.email)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          Email id
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Email id"
                          type="email"
                        />
                        {errors.email && (
                          <FormHelperText>
                            {errors.email.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    // disabled={true}
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.password)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          password
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Password"
                          type="password"
                        />
                        {errors.password && (
                          <FormHelperText>
                            {errors.password.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
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
