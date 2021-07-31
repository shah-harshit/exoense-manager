import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { FormComponent } from "../form/FormComponent";
import { ExpenseTable } from "../expense-table/ExpenseTable";

export const ExpenseManager = () => {
  const [entries, setEntries] = useState([]);

  const onSubmit = (data) => {
    const arrData = [...entries];
    arrData.push(data);
    setEntries(arrData);
  };

  return (
    <Grid container item direction="column" spacing={4} sm={12}>
      <Grid item>
        <FormComponent onSubmit={onSubmit} />
      </Grid>

      <Grid item style={{ height: 400, width: "100%" }}>
        <ExpenseTable rowData={entries} />
      </Grid>
    </Grid>
  );
};
