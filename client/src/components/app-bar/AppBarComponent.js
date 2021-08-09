import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const AppBarComponent = () => {
  return (
    <AppBar position="static" style={{ marginBottom: "70px" }}>
      <Link to="/transactions" />
      <Toolbar>
        <Typography variant="h5">Expense Manager</Typography>
      </Toolbar>
    </AppBar>
  );
};
