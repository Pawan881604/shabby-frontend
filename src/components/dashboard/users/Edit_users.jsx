"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
  Select,
  MenuItem,
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
import { forwardRef, useEffect } from "react";
import { ADD_user, update_admin_user } from "../../../api/authapi";
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
  name: z.string().min(1, { message: "Name is required" }),
  status: z.string().min(1, { message: "status is required" }),
  role: z.string().min(1, { message: "status is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Edit_users = ({ open, setOpen, isvisible }) => {
  const dispatch = useDispatch();
  const { loading_: user_details_loading, user_details } = useSelector(
    (state) => state.users
  );

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
      name: "",
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    if (isvisible) {
      dispatch(update_admin_user(data, user_details.user_id));
      return;
    }
    const uuid = generateUuid();
    dispatch(ADD_user(data, uuid));
  };

  useEffect(() => {
    if (!isvisible) {
      setValue("email", "");
      setValue("password", "");
      setValue("name", "");
      setValue("status", "Active");
      setValue("role", "");
    }
    if (user_details) {
      setValue("email", user_details.email || "");
      setValue("name", user_details.name || "");
      setValue("role", user_details.role || "");
      setValue("password", user_details.password || "");
      setValue("status", user_details.status || "");
    }
  }, [setValue, user_details, dispatch, isvisible]);
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
                <Stack spacing={2}>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.name)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          Name
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Name"
                          type="name"
                        />
                        {errors.name && (
                          <FormHelperText>{errors.name.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Stack>
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
                </Stack>
                <Stack spacing={2}>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: isvisible && "Password is required",
                    }}
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
                          disabled={isvisible}
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

                <Stack spacing={2}>
                  <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.role)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          Role
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
                          <MenuItem value="admin" sx={{ fontSize: "12px" }}>
                            Admin
                          </MenuItem>
                          <MenuItem value="manager" sx={{ fontSize: "12px" }}>
                            Manager
                          </MenuItem>
                        </Select>
                        {errors.role && (
                          <FormHelperText>{errors.role.message}</FormHelperText>
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
