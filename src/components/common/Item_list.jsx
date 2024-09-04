import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

export default function VirtualizedList({data}) {
  return (
   
        <ListItem style={style} omponent="div" disablePadding>
          <ListItemButton>
            <ListItemText primary={`${data.phone_number}`} />
          </ListItemButton>
        </ListItem>

  );
}
