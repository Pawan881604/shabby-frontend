"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
  Autocomplete,
  TextField,
  Paper,
  Chip,
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
import { forwardRef, useEffect, useMemo, useState } from "react";
import { add_normal_user, clearErrors, update_user } from "api/authapi";
import { get_all_branch } from "../../../api/branchapi";
import generateUuid from "lib/Uuidv4";

const schema = z.object({
  phone: z
    .string()
    .regex(/^\+91[0-9]{10,13}$/, { message: "Invalid phone number" }),
  status: z.string().min(1, { message: "Status link is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Edit_customer = ({ open,  isvisible ,setOpen}) => {
  const [chipData, setChipData] = useState([]);

  const { branch } = useSelector((state) => state.branch);
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
      phone: "+91",
      status: "Active",
    },
  });

  const onSubmit = async (data) => {
    if (isvisible) {
      dispatch(update_user(data, chipData, user_details.user_id));

      return;
    }
    const uuid = generateUuid();
    dispatch(add_normal_user(data, chipData, uuid));
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

    if (!isvisible) {
      setValue("phone", "+91");
      setValue("status", "Active");
      setChipData([]);
    }

    if (user_details) {
      setValue("phone", user_details.phone_number || "");
      setValue("status", user_details.status || "");
      setChipData(
        user_details.branch &&
          user_details.branch.map((item) => ({
            id: item._id,
            name: item.branch,
          }))
      );
    }
  }, [user_details, setValue, dispatch, isvisible]);

  const branches = branch
    ? branch.map((item) => ({ id: item._id, name: item.branch }))
    : [];

  return (
    <>
      <Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={()=> setOpen(false)}
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
                {isvisible ? "Update" : "Add"} new Customer
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {user_details_loading ? (
              <Loadin_section />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} sx={{ marginBottom: 2 }}>
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
                  }}
                  component="div"
                >
                  {chipData &&
                    chipData.map((data) => (
                      <Chip
                        key={data._id}
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
                    options={branches}
                    getOptionLabel={(option) => option?.name || ""} // Handle missing or undefined name
                    onChange={(event, newValue) =>
                      branch_onchange_handler(event, newValue)
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
