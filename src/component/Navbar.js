import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Typography
          component="div"
          color={"white"}
          fontSize="16px"
          fontWeight="bold"
        >
          TO DO LIST APP
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
