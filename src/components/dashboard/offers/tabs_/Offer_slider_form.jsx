"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import generateUuid from "lib/Uuidv4";
import { Image_uploader } from "components/common/Image_uploader";
import {
  add_offer_slider,
  clearErrors,
  get_all_offer_slider,
} from "api/offerapi";
import { Alert_ } from "styles/theme/alert";
import {
  ADD_OFFER_SLIDER_DETAILS_RESET,
  UPDATE_OFFER_SLIDER_DETAILS_RESET,
} from "lib/redux/constants/offer_actionTypes";
import { showAlert } from "api/alert_action";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

export const Offer_slider_form = () => {
  const [files, setFiles] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { error, update_loading, update, success } = useSelector(
    (state) => state.offers_slider
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      status: "Active",
    },
  });

  const onSubmit = async (data) => {
    if (!files) {
      dispatch(showAlert("Add another one image", "error"));
      return;
    }
    const uuid = generateUuid();
    dispatch(add_offer_slider(data, files, uuid));
  };

  useEffect(() => {
    if (success) {
      setValue("title", "");
      setFiles(null);
    }
  }, [setValue, dispatch, success, files]);

  return (
    <>
      <Box>
        <Alert_
          success={success}
          update={update}
          error={error}
          clearErrors={clearErrors}
          add_reset={ADD_OFFER_SLIDER_DETAILS_RESET}
          update_reset={UPDATE_OFFER_SLIDER_DETAILS_RESET}
          get_data={get_all_offer_slider}
          currentPage={1}
          filter_1={""}
          setOpen={setOpen}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid
              lg={3}
              sm={6}
              xs={12}
              sx={{
                padding: {
                  xs: "0px",
                  sm: "0px 5px",
                  lg: "0px 5px",
                },
                order: {
                  xs: 2,
                  sm: 1,
                },
                marginTop: 2,
              }}
            >
              <Box>
                <Stack>
                  <Controller
                    control={control}
                    name="title"
                    // disabled={true}
                    render={({ field }) => (
                      <FormControl
                        sx={{ marginTop: "13px" }}
                        error={Boolean(errors.title)}
                      >
                        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                          Site title
                        </InputLabel>
                        <OutlinedInput
                          inputProps={{
                            style: { padding: "10px", fontSize: "12px" },
                          }}
                          {...field}
                          label="Site title"
                          type="title"
                        />
                        {errors.title && (
                          <FormHelperText>
                            {errors.title.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Stack>
                <Stack>
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

                <Stack>
                  <Button
                    sx={{
                      padding: "5px 10px",
                      marginTop: "15px",
                      fontSize: "14px",
                      position: "relative",
                      width: "auto",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={update_loading}
                  >
                    {update_loading ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress
                          size={24}
                          sx={{ position: "absolute" }}
                        />
                        <Box sx={{ opacity: 0 }}>Loading</Box>
                      </Box>
                    ) : (
                      "Add New"
                    )}
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid
              lg={8}
              sm={6}
              xs={12}
              sx={{
                padding: {
                  xs: "0px",
                  sm: "0px 5px",
                  lg: "0px 5px",
                },
                order: {
                  xs: 1,
                  sm: 2,
                },
                marginTop: 2,
              }}
            >
              <Box>
                <Image_uploader setFiles={setFiles} />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};
