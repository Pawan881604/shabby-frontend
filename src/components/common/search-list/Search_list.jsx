import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";

const Search_list = ({ searchQuery, handleInputChange, data, get_data_id }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <FormControl sx={{ marginTop: "13px", width: "100%" }}>
        <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
          Search user
        </InputLabel>
        <OutlinedInput
          inputProps={{
            style: { padding: "10px", fontSize: "12px" },
          }}
          label=" Search user"
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </FormControl>
      {data.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            overflowY: "scroll",
            maxHeight: "350px",
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              fontSize: "12px !important",
              bgcolor: "background.paper",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {data.map((item, i) => (
              <ListItemButton
                style={{ fontSize: "12px ", padding: "2px 10px" }}
                key={i}
                onClick={() => get_data_id(item)}
              >
                <ListItemText
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        display: "inline",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      ) : null}
    </Box>
  );
};

export default Search_list;
