import { Box } from "@mui/material";
import React from "react";
import { Offer_slider_form } from "./Offer_slider_form";
import { Carousel } from "components/common/slider/Slider";

export const Tab_containor = ({ index }) => {
  return (
    <Box>
      {index === 1 ? (
        <Offer_slider_form />
      ) : index === 2 ? (
        <Carousel />
      ) : (
        <p>12345</p>
      )}
    </Box>
  );
};
