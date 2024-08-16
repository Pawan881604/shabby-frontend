"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import { authClient } from "../../lib/auth/client";
import { useUser } from "../../hooks/use-user";
import { Box, InputLabel, OutlinedInput } from "@mui/material";
import { Auth } from "../../api/authapi";
import generateUuid from "../../lib/Uuidv4";
const schema = zod.object({
  email: zod
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: zod.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
});

export function SignInForm() {
  const router = useRouter();
  const { checkSession } = useUser();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values) => {
      console.log(values);
      // const uuid = await generateUuid();
      // const response = await Auth(values, uuid);
      //   if (response.data) {
      //     setuser_id(response.data.user_data);
      //     setOpt_page(true);
      //     return;
      //   }
      //   if (response.error) {
      //     setError("root", {
      //       type: "server",
      //       message: response.error,
      //     });
      //     return;
      //   }
      //   router.refresh();
    },
    [router, setError]
  );

  return (
    <Box
      style={{
        overflow: "hidden",
        display: "flex",
        maxWidth: "400px",
        margin: "auto auto",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={4}>
        <Box
          style={{
            background: "#fff",
            margin: "10px 0px 0px",
            borderRadius: "20px",
          }}
        >
          <Typography
            variant="h2"
            style={{
              textAlign: "center",
              color: "#000",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            Welcome to
          </Typography>
          <Stack spacing={1} className="login-img-cont">
            <Box
              component="img"
              alt="Widgets"
              src="/assets/shabby.png"
              sx={{ height: "auto", width: "110px", maxWidth: "600px" }}
            />
          </Stack>
          <Box
            style={{
              maxWidth: "450px",
              margin: "auto",
              padding: "20px 20px 20px",
            }}
          >
            <Box style={{ overflow: "hidden" }}>
              <Box style={{ flex: "0 0 auto", width: "100%" }}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ marginTop: "10px" }}
                >
                  <Stack spacing={2}>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.email)}>
                          <InputLabel style={{ fontSize: "14px", top: "-4px" }}>
                            Email address
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            label="Email address"
                            type="email"
                            inputProps={{
                              style: {
                                padding: "10px",
                                fontSize: "14px",
                              },
                            }}
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
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.password)}>
                          <InputLabel style={{ fontSize: "14px", top: "-4px" }}>
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
                              },
                            }}
                          />
                          {errors.password && (
                            <FormHelperText>
                              {errors.password.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />

                    {errors.root && (
                      <Alert color="error">{errors.root.message}</Alert>
                    )}
                    <Button
                      // disabled={isPending}
                      type="submit"
                      variant="contained"
                    >
                      Sign in
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
