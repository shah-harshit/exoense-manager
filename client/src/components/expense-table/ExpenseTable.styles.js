import { makeStyles } from "@material-ui/core/styles";

export const expenseTableStyles = makeStyles({
  root: {
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: "none",
    },
  },
});
