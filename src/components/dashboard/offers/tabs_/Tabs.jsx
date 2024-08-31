import { Box, Grid, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab_containor } from "./Tab_containor";
import { useDispatch, useSelector } from "react-redux";
import { get_all_offer_slider } from "api/offerapi";
import {
  ADD_OFFER_SLIDER_DETAILS_RESET,
  UPDATE_OFFER_SLIDER_DETAILS_RESET,
} from "lib/redux/constants/offer_actionTypes";

export const Tabs = () => {
  const dispatch = useDispatch();
  const [index, setindex] = useState(1);
  const { success, update } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(get_all_offer_slider());
    if (success) {
      dispatch(get_all_offer_slider());
      setindex(2);
      dispatch({ type: ADD_OFFER_SLIDER_DETAILS_RESET });
    }
    if (update) {
      dispatch(get_all_offer_slider());
      dispatch({ type: UPDATE_OFFER_SLIDER_DETAILS_RESET });
    }
  }, [success, dispatch, update]);

  return (
    <Grid
      container
      sx={{
        padding: {
          xs: "0px",
          sm: "0px 5px",
          lg: "0px 5px",
        },
      }}
    >
      <Grid lg={3} sm={3} xs={12}>
        <Box>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={() => setindex(1)}>
              {/* <ListItemIcon>
              <SendIcon />
            </ListItemIcon> */}
              <ListItemText primary="Add offer slider" />
            </ListItemButton>
            <ListItemButton onClick={() => setindex(2)}>
              {/* <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon> */}
              <ListItemText primary="Preview slider" />
            </ListItemButton>
            <ListItemButton onClick={() => setindex(3)}>
              {/* <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon> */}
              <ListItemText primary="Slider list" />
            </ListItemButton>
          </List>
        </Box>
      </Grid>
      <Grid
        lg={9}
        sm={9}
        xs={12}
        sx={{
          padding: {
            xs: "0px",
            sm: "0px 5px",
            lg: "0px 5px",
          },
        }}
      >
        <Box sx={{ height: "400px" }}>
          <Tab_containor index={index} />
        </Box>
      </Grid>
    </Grid>
  );
};
