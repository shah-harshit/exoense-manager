import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={4}
      direction="column"
    >
      <Grid item>
        <Typography variant="h4">Page Not Found</Typography>
      </Grid>
      <Grid item>
        <Link to="/transactions">Go to main page</Link>
      </Grid>
    </Grid>
  );
};
