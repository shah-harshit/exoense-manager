import React, { useState, useEffect } from "react";
import { expenseTableStyles } from "./ExpenseTable.styles";
import { DataGrid } from "@material-ui/data-grid";
import { Grid, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { SnackBar } from "../snackbar/SnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

export const ExpenseTable = (props) => {
  const { rowData } = props;
  const [rows, setRows] = useState([]);
  const [snackBarMessage, setSnackBarMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = expenseTableStyles();

  const getEntries = () => {
    axios
      .get("/transactions")
      .then((res) => {
        const tempRows = [];
        res.data.length > 0 &&
          res.data.forEach((row) => {
            const temp = {
              ...row,
              id: row._id,
            };

            tempRows.push(temp);
          });

        setRows(tempRows);
      })
      .catch((err) => setSnackBarMessage(err.data.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getEntries();
  }, [rowData]);

  const onDeleteTableRow = (deletedRow) => {
    axios
      .delete("/transactions/delete", { data: { id: deletedRow.id } })
      .then((res) => setSnackBarMessage(res.data.message));
    getEntries();
  };

  const renderDeleteCell = (params) => {
    return (
      <IconButton onClick={() => onDeleteTableRow(params.row)}>
        <Delete color="primary" />
      </IconButton>
    );
  };

  const columns = [
    { field: "date", headerName: "Date" },
    { field: "fromPerson", headerName: "From" },
    { field: "toPerson", headerName: "To" },
    {
      field: "amount",
      headerName: "Amount",
      width: 125,
    },
    { field: "reason", headerName: "Reason", sortable: false },
    {
      field: "delete",
      headerName: "Remove",
      sortable: false,
      renderCell: (params) => renderDeleteCell(params),
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container item style={{ height: 400 }} sm={12}>
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        disableColumnMenu
      />
      {snackBarMessage && (
        <SnackBar
          message={snackBarMessage}
          onClose={() => setSnackBarMessage(null)}
        />
      )}
    </Grid>
  );
};
