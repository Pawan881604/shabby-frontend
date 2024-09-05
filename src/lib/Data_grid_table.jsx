"use client";
import { MaterialReactTable } from "material-react-table";
import { Loadin_section } from "./Loadin_section";
import { Paginations } from "./Paginations";
import { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export const Data_grid_table = ({
  apidata,
  columns,
  loading,
  totalPages,
  pageSize,
  currentPage,
  handlePageChange,
  row_Per_page,
  setrow_Per_page,
}) => {
  const validRows = Array.isArray(apidata) ? apidata : [];

  const handleChange = (event) => {
    setrow_Per_page(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Loadin_section />
      ) : (
        <>
          <MaterialReactTable
            columns={columns}
            data={validRows}
            renderBottomToolbar={() => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Row per page
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={row_Per_page}
                      label="Row per page"
                      onChange={handleChange}
                      inputProps={{
                        sx: { fontSize: "12px" },
                      }}
                    >
                      <MenuItem sx={{ fontSize: "12px" }} value={5}>
                        5
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={10}>
                        10
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={25}>
                        25
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={50}>
                        50
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={75}>
                        75
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={100}>
                        100
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                </Box>
                <Box>
                  {pageSize<totalPages &&
                  <Paginations
                    totalItemsCount={totalPages}
                    activePage={currentPage}
                    itemsCountPerPage={pageSize}
                    handlePageChange={handlePageChange}
                  />}
                </Box>
                <Box>
                  {/* <Typography variant="h4">Total item {totalPages}</Typography> */}
                </Box>
              </Box>
            )}
          />
        </>
      )}
    </>
  );
};
