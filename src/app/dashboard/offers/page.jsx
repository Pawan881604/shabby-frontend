"use client";
import React from "react";

import { Box } from "@mui/material";
import { Tabs } from "components/dashboard/offers/tabs_/Tabs";
import { Offers } from "components/dashboard/offers/Offers";

const Page = () => {
  return (
    <Box>
      <Box sx={{marginBottom:'100px'}}>
        <Tabs />
      </Box>
      <Box>
        <Offers />
      </Box>
    </Box>
  );
};

export default Page;
