"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormHelperText, Stack } from "@mui/material";
import { UserContext } from "contexts/user-context";
import { update_profile_details } from "api/authapi";

const schema = z.object({
  fullname: z.string().optional().min(1, { message: "Full name is required" }),
  email: z
    .string()
    .optional()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  phone_number: z.string().optional().min(1, { message: "Phone is required" }),
});

export function AccountDetailsForm() {
  const userContext = React.useContext(UserContext);

  if (!userContext) {
    return <Alert severity="error">User context is not available</Alert>;
  }
  const { error, user, isLoading } = userContext;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      phone_number: "",
      fullname: "",
    },
  });

  React.useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("phone_number", user.phone_number);
      setValue("fullname", user.name);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    // dispatch(update_profile_details(data, user.user_id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={1.9}>
            <Grid md={6} xs={12}>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="fullname"
                  render={({ field }) => (
                    <FormControl
                      sx={{ marginTop: "0px" }}
                      error={Boolean(errors.fullname)}
                    >
                      <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                        Full name
                      </InputLabel>
                      <OutlinedInput
                        inputProps={{
                          style: { padding: "10px", fontSize: "12px" },
                        }}
                        {...field}
                        label="Full name"
                        type="text"
                      />
                      {errors.fullname && (
                        <FormHelperText>
                          {errors.fullname.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            </Grid>

            <Grid md={6} xs={12}>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormControl
                      sx={{ marginTop: "0px" }}
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
                        <FormHelperText>{errors.email.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            </Grid>
            <Grid md={6} xs={12}>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormControl
                      sx={{ marginTop: "0px" }}
                      error={Boolean(errors.phone_number)}
                    >
                      <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                        Phone number
                      </InputLabel>
                      <OutlinedInput
                        inputProps={{
                          style: { padding: "10px", fontSize: "12px" },
                        }}
                        {...field}
                        label="phone number"
                        type="number"
                      />
                      {errors.phone_number && (
                        <FormHelperText>
                          {errors.phone_number.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
