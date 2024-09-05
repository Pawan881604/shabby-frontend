"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { z as zod } from "zod";
import {
  Alert,
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  clearErrors,
  get_all_users,
  reset_user_password,
  search_all_user,
} from "../../../api/authapi";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { USER_PASSWORD_RESET_RESET } from "lib/redux/constants/user_actionTypes";
import { useEffect, useState } from "react";
import { Alert_ } from "styles/theme/alert";

const schema = zod.object({
  password: zod.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
});

export function UpdatePasswordForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("error"); // Default to 'error'
  const [chipData, setChipData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { search_data } = useSelector((state) => state.search);
  const { error, user, loading, update } = useSelector((state) => state.users);

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values) => {
    if (chipData.length > 0) {
      const email = chipData[0].email;
      dispatch(reset_user_password(values, email));
    }
  };

  useEffect(() => {
    dispatch(get_all_users());
    if (alertMessage) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
    if (error) {
      setShowAlert(true);
      setAlertColor("error");
      setAlertMessage(error);
      dispatch(clearErrors());
      // Handle specific field errors here if needed
    }
    if (update) {
      setShowAlert(true);
      setAlertColor("success");
      setValue("password", "");
      setChipData([]);
      setSearchQuery("");
      setAlertMessage("User password updated successfully!");
      dispatch({ type: USER_PASSWORD_RESET_RESET });
    }
  }, [error, update, alertMessage]);

  const handleInputChange = (event) => {
    const trimmedValue = event.target.value.trim();
    setSearchQuery(trimmedValue);
    dispatch(search_all_user(1, "admin", trimmedValue, "manager"));
  };

  const handleDelete = (chipToDelete) => {
    setChipData((chips) =>
      chips.filter((chip) => chip._id !== chipToDelete._id)
    );
  };

  const get_user_id = (data) => {
    setChipData((prev) => {
      const isExist = prev.some((item) => item._id === data._id);
      if (!isExist) {
        return [data, ...prev];
      }
      return prev;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showAlert && (
        <Alert
          style={{
            position: "fixed",
            zIndex: 10000,
            right: "8px",
            top: "10px",
          }}
          severity={alertColor === "success" ? "success" : "error"}
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      )}
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Edit user password"
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            {chipData.length > 0 ? (
              <Paper
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                  listStyle: "none",
                  maxWidth: "350px",
                  marginBottom: "20px",
                  p: 0.8,
                }}
                component="div"
              >
                {chipData.map((data) => (
                  <Chip
                    key={data._id}
                    label={data.email}
                    onDelete={() => handleDelete(data)}
                  />
                ))}
              </Paper>
            ) : (
              <Box sx={{ width: "100%" }}>
                <FormControl sx={{ marginTop: "13px",marginBottom:'10px', width: "100%" }}>
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
                        marginBottom:'10px',
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {search_data && search_data.map((item, i) => (
                        <ListItemButton
                          style={{ fontSize: "12px ", padding: "2px 10px" }}
                          key={i}
                          onClick={() => get_user_id(item)}
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
                                {item.email}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Box>
                ) : null}
              </Box>
            )}
          </Stack>
          <Stack spacing={2} sx={{marginBottom:'10px'}}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl
                error={Boolean(errors.password)}
                style={{ width: "100%" }}
              >
                <InputLabel style={{ fontSize: "13px", top: "-5px" }}>
                  Password
                </InputLabel>
                <OutlinedInput
                  {...field}
                  label="Password"
                  type="password"
                  inputProps={{
                    style: {
                      padding: "10px",
                      fontSize: "14px",
                      width: "100%",
                    },
                  }}
                />
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          </Stack>
          {errors.root && <Alert color="error">{errors.root.message}</Alert>}
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Save details"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
