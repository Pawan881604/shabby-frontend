import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WhatsappLogo,GitBranch } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function Total_websites() {
  const [vlaue, setValue] = React.useState("All");

  const { count_website,loading , active_count, inactive_count } = useSelector(
    (state) => state.website
  );
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Card sx={{ ".MuiCardContent-root": { padding: "15px" } }}>
      <CardContent>
        <Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
          >
            <Stack>
              <Typography color="text.secondary" variant="overline">
                {vlaue === "All"
                  ? "Total"
                  : vlaue === "Active"
                  ? "Active"
                  : "Inactive"}{" "}
                Websites
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "var(--mui-palette-success-main)",
                height: "47px",
                width: "47px",
              }}
            >
              <GitBranch fontSize="var(--icon-fontSize-lg)" /> 
            </Avatar>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
          >
            <Link
              style={{ textDecoration: "none" }}
              href={"/dashboard/branch"}
            >
              {loading ? (
                <Box sx={{ padding: "7px" }}>
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <Typography
                  sx={{
                    border: "1px solid #15b79f",
                    borderRadius: "100%",
                    width: "47px",
                    height: "47px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    transition: "color 0.3s",
                    "&:hover": {
                      color: "#ffff",
                      background: "#15b79f",
                    },
                  }}
                  variant="h4"
                >
                  {vlaue === "All"
                    ? count_website
                    : vlaue === "Active"
                    ? active_count
                    : inactive_count}
                </Typography>
              )}
            </Link>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Status</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={vlaue}
                label="User Filter"
                sx={{ fontSize: "12px" }}
                onChange={handleChange}
              >
                <MenuItem sx={{ fontSize: "12px" }} value="All">
                  All
                </MenuItem>
                <MenuItem sx={{ fontSize: "12px" }} value="Active">
                  Active
                </MenuItem>
                <MenuItem sx={{ fontSize: "12px" }} value="Inactive">
                  Inactive
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
