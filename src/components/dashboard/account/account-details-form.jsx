"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { z as zod } from "zod";
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { get_all_users, reset_user_password } from "../../../api/authapi";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = zod.object({
  password: zod.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
});

export function AccountDetailsForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  const { user } = useSelector((state) => state.users);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values) => {
    dispatch(reset_user_password(values, email));
  };

  React.useEffect(() => {
    dispatch(get_all_users());
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Edit user password"
        />
        <Divider />
        <CardContent>
          <Box sx={{ width: "100%", mb: "15px", width: "100%" }}>
            <Autocomplete
              sx={{ width: "100%" }}
              autoHighlight
              options={user}
              getOptionLabel={(option) => option?.email || ""} // Handle missing or undefined name
              onChange={(event, newValue) => {
                setEmail(newValue.email);
              }}
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
          <Controller
            control={control}
            name="password"
            style={{ width: "100%" }}
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

          {errors.root && <Alert color="error">{errors.root.message}</Alert>}
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
