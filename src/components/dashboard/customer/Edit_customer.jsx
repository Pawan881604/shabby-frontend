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
import { clearErrors, update_user } from "api/authapi";
import { UPDATE_USER_DETAILS_RESET } from "lib/redux/constants/user_actionTypes";
import { Alert_ } from "styles/theme/alert";
import { get_all_branch } from "../../../api/branchapi";

const schema = z.object({
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,13}$/, { message: "Invalid phone number" }),
  // branch: z.string().min(1, { message: "Branch is required" }),
  // authorize: z.string().min(1, { message: "authorize is required" }),
  // role: z.string().min(1, { message: "authorize is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Edit_customer = ({ open, setOpen, setAlertColor, alertColor }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [chipData, setChipData] = useState([]);

  const { loading: branch_loading, branch } = useSelector(
    (state) => state.branch
  );
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
      // branch: "",
      // authorize: "",
      // role: "",
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    dispatch(update_user(data, chipData, user_details.user_id));
    handleClose();
  };

  const handleDelete = (ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== ChipData.id));
  };
  const branch_onchange_handler = (e, newValue) => {
    const exists = chipData.some((item) => item.id === newValue.id);

    if (!exists) {
      // Add the newValue to chipData only if its id does not exist
      setChipData((prev) => [newValue, ...prev]);
    } // Add the selected value to the array
  };

  useEffect(() => {
    dispatch(get_all_branch());
    if (error) {
      setShowAlert(true);
      setAlertColor(false);
      setAlertMessage(error);
      dispatch(clearErrors());
    }
    if (user_details) {
      setValue("phone", user_details.phone_number || "");
      setValue(
        "branch",
        user_details.branch === null ? "Not set" : user_details.branch || ""
      );

      setValue("authorize", user_details.authorize || "");
      setValue("role", user_details.role || "");
      // if (Array.isArray(user_details.branch)) {
      //   setChipData(() =>
      //     user_details.branch.filter((item) => item.includes(branch.branch_id))
      //   );
      // }
    }
    if (update) {
      setShowAlert(true);
      setAlertColor(true);
      setAlertMessage("User details updated successfully!");
      dispatch({ type: UPDATE_USER_DETAILS_RESET });
    }
  }, [user_details, setValue, update, dispatch, error]);

  const branches = branch
    ? branch.map((item) => ({ id: item.branch_id, name: item.branch }))
    : [];

  useMemo(() => {
    if (branch && Array.isArray(user_details?.branch)) {
      setChipData(
        branch
          .filter((item) => user_details.branch.includes(item.branch_id))
          .map((item) => ({ id: item.branch_id, name: item.branch }))
      );
    }
  }, [branch]);

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
                    status={alertColor ? "success" : "error"}
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
                <Paper
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    listStyle: "none",
                    maxWidth: "350px",
                    p: 0.8,
                    m: "10px 0px ",
                  }}
                  component="div"
                >
                  {chipData.map((data) => (
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
                    options={branches}
                    getOptionLabel={(option) => option?.name || ""} // Handle missing or undefined name
                    onChange={(event, newValue) =>
                      branch_onchange_handler(event, newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{
                          style: { fontSize: "13px", top: "-4px" },
                        }}
                        label="Choose branch"
                        inputProps={{
                          ...params.inputProps,
                          style: {
                            padding: "4px 4px", // Adjust padding as needed
                            fontSize: "12px", // Ensure the font size matches the above for consistency
                          },
                        }}
                      />
                    )}
                  />
                </Box>

                {/* <Controller
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
                /> */}
                {/* <Controller
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
                /> */}
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
