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
  Paper,
  Chip,
  List,
  ListItemButton,
  ListItemText,
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
import { get_all_branch, search_all_branch } from "../../../api/branchapi";
import generateUuid from "lib/Uuidv4";
import Search_list from "components/common/search-list/Search_list";

const schema = z.object({
  phone: z
    .string()
    .regex(/^\+91[0-9]{10,13}$/, { message: "Invalid phone number" }),
  status: z.string().min(1, { message: "Status link is required" }),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Edit_customer = ({ open, isvisible, setOpen }) => {
  const dispatch = useDispatch();
  const [chipData, setChipData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { search_data } = useSelector((state) => state.search);

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

  useEffect(() => {
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
          user_details.branch
      );
    }
  }, [user_details, setValue, dispatch, isvisible]);

  const onSubmit = async (data) => {
    const ids = chipData && chipData.map((item) => item._id);

    if (isvisible) {
      dispatch(update_user(data, ids, user_details.user_id));

      return;
    }
    const uuid = generateUuid();
    dispatch(add_normal_user(data, ids, uuid));
  };

  const handleInputChange = (event) => {
    const trimmedValue = event.target.value;
    setSearchQuery(trimmedValue);
    dispatch(search_all_branch(1, trimmedValue));
  };
  const handleDelete = (chipToDelete) => {
    setChipData((chips) =>
      chips.filter((chip) => chip._id !== chipToDelete._id)
    );
  };
  const get_branch_id = (data) => {
    setChipData((prev) => {
      const isExist = prev.some((item) => item._id === data._id);
      if (!isExist) {
        return [data, ...prev];
      }
      return prev;
    });
  };

  return (
    <>
      <Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
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

                <Stack spacing={2}>
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
                          label={data.branch}
                          onDelete={() => handleDelete(data)}
                        />
                      ))}
                  </Paper>
                  <Box sx={{ width: "100%" }}>
                    <FormControl sx={{ marginTop: "13px", width: "100%" }}>
                      <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                        Search user
                      </InputLabel>
                      <OutlinedInput
                        inputProps={{
                          style: { padding: "10px", fontSize: "12px" },
                        }}
                        label=" Search user"
                        type="search"
                        value={searchQuery}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    {search_data.length > 0 ? (
                      <Box
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                          overflowY: "scroll",
                          maxHeight: "350px",
                        }}
                      >
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            fontSize: "12px !important",
                            bgcolor: "background.paper",
                          }}
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                        >
                          {search_data.map((item, i) => (
                            <ListItemButton
                              style={{ fontSize: "12px ", padding: "2px 10px" }}
                              key={i}
                              onClick={() => get_branch_id(item)}
                            >
                              <ListItemText
                                secondary={
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{
                                      color: "text.primary",
                                      display: "inline",
                                    }}
                                  >
                                    {item.branch}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Box>
                    ) : null}
                  </Box>
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
