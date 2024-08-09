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
import generateUuid from "lib/Uuidv4";
import {
  ADD_BRANCH_DETAILS_RESET,
  UPDATE_BRANCH_DETAILS_RESET,
} from "lib/redux/constants/branch_actionTypes";

const schema = z.object({
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,13}$/, { message: "Invalid phone number" }),
  branch: z.string().min(1, { message: "Branch is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Edit_branch = ({ open, setOpen, isvisible }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const { loading_, branch_details, success, update, error } = useSelector(
    (state) => state.branch,
  );
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
      dispatch(clearErrors());
    }

    if (!isvisible) {
      setValue("phone", "");
      setValue("branch", "");
    }
    if (branch_details) {
      setValue("phone", branch_details.phone_number || "");
      setValue(
        "branch",
        branch_details.branch === null
          ? "Not set"
          : branch_details.branch || "",
      );
    }
    if (success) {
      setShowAlert(true);
      setAlertMessage("Branch details Added successfully!");
      dispatch({ type: ADD_BRANCH_DETAILS_RESET });
    }
    if (update) {
      setShowAlert(true);
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
                {isvisible ? "Update" : "Add new"} Customer
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
                          Branch Phone Number
                        </InputLabel>
                        <OutlinedInput
                          disabled={isvisible}
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Branch Phone Number"
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
                <Stack spacing={2}>
                  <Controller
                    control={control}
                    name="branch"
                    // disabled={true}
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.branch)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          Branch Name
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Branch name"
                          type="branch"
                        />
                        {errors.branch && (
                          <FormHelperText>
                            {errors.branch.message}
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
