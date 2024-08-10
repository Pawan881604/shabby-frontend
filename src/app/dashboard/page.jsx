"use client"
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Branches } from "../../components/dashboard/overview/branches";
import { NewCustomers } from "../../components/dashboard/overview/new-customers";
import { TotalCustomers } from "../../components/dashboard/overview/total-customers";

export default function Page() {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Branches sx={{ height: "100%" }} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers
          sx={{ height: "100%" }}
        />
      </Grid>
      {/* <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid> */}
      {/* <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid> */}
      <Grid lg={12} md={12} xs={12}>
        <NewCustomers sx={{ height: "100%" }} />
      </Grid>
    </Grid>
  );
}
