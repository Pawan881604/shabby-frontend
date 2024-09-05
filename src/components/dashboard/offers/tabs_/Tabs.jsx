"use client"
import { Box, Grid, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab_containor } from "./Tab_containor";
import { useDispatch } from "react-redux";
import { get_all_offer_slider } from "api/offerapi";

export const Tabs = () => {
  const dispatch = useDispatch();
  const [index, setindex] = useState(1);
  useEffect(() => {
    dispatch(get_all_offer_slider(1));
  }, [dispatch]);

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
