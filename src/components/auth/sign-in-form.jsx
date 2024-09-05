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
import {
  Box,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import { authClient } from "../../lib/auth/client";
import { useUser } from "../../hooks/use-user";
import generateUuid from "../../lib/Uuidv4";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
});

export function SignInForm() {
  const router = useRouter();
  const [auth, setauth] = React.useState(false);
  const { checkSession } = useUser();
  const [loading, setLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

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
      setLoading(true);

      const uuid = await generateUuid();
      const { error } = await authClient.signInWithEmail(values, uuid);
      if (error) {
        setError("root", { type: "server", message: error });
        setLoading(false);
        return;
      }
      await checkSession?.();
      router.refresh();
      setauth(true);
      setSnackbarOpen(true);
      setLoading(false);
    },
    [checkSession, router, auth, setError]
  );

  return (
    <Box
      style={{
        overflow: "hidden",
        display: "flex",
        maxWidth: "400px",
        margin: "auto",
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
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Sign in"}
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>

      {/* Snackbar for welcome message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%", backgroundColor: "green", color: "white" }}
        >
          Welcome!
        </Alert>
      </Snackbar>
    </Box>
  );
}
