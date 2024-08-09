import { DataGrid } from "@mui/x-data-grid"; // Updated import for the latest DataGrid
import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import {Loadin_section} from "./Loadin_section";

export const Data_grid_table = ({ rows, columns, loading }) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to the first page when page size changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Directly set the new page
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  return (
    <>
      {loading ? (
      <Loadin_section/>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 25, 50, 100]}
          onPageSizeChange={handlePageSizeChange}
          page={page}
          onPageChange={(params) => handlePageChange(params.page)}
          pagination
          // checkboxSelection
          className="product-list-table"
          autoHeight
          // onSelectionModelChange={handleSelectionModelChange}
        />
      )}
    </>
  );
};


