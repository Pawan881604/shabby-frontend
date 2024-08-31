import { Box } from "@mui/material";
import React from "react";
import { Offer_slider_form } from "./Offer_slider_form";
import { Carousel } from "components/common/slider/Slider";
import { Offer_slider_list } from "./Offer_slider_list";

export const Tab_containor = ({ index }) => {
  return (
    <Box>
      {index === 1 ? (
        <Offer_slider_form />
      ) : index === 2 ? (
        <Carousel />
      ) : (
        <Offer_slider_list />
      )}
    </Box>
  );
};
