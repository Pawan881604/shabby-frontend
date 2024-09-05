"use client";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_all_users } from "api/authapi";
import { get_all_branch } from "api/branchapi";
import { get_all_website } from "api/website";
import { Branches } from "./branches";
import { TotalCustomers } from "./total-customers";
import { Total_websites } from "./total-websites";

export const Dashboard = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_users());
    dispatch(get_all_branch());
    dispatch(get_all_website());
  }, [dispatch]);
  return (
    <Grid container spacing={3}>
    <Grid lg={3} sm={6} xs={12}>
      <Branches />
    </Grid>
    <Grid lg={3} sm={6} xs={12}>
      <TotalCustomers />
    </Grid>
    <Grid lg={3} sm={6} xs={12}>
      <Total_websites />
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
    {/* <Grid lg={12} md={12} xs={12}>
      <NewCustomers sx={{ height: "100%" }} />
    </Grid> */}
  </Grid>
  )
}
