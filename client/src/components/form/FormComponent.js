import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { BASE_URL, PERSONS, EXPENSE_OPTIONS } from "../../constants";
import { SnackBar } from "../snackbar/SnackBar";
import axios from "axios";

const initBalanceData = PERSONS.map((person) => ({
  name: person,
  amountReceived: 0,
  amountPaid: 0,
  balance: 0,
}));

export const FormComponent = (props) => {
  const [date, setDate] = useState("2021-07-01");
  const [fromPerson, setFromPerson] = useState("");
  const [amount, setAmount] = useState("");
  const [toPerson, setToPerson] = useState("");
  const [reason, setReason] = useState("");
  const [balanceData, setBalanceData] = useState(initBalanceData);
  const [snackBarMessage, setSnackBarMessage] = useState(null);

  const onSubmit = async () => {
    const data = {
      date,
      fromPerson,
      amount,
      toPerson,
      reason,
    };

    const newBalanceData = [...balanceData];
    newBalanceData.forEach((obj) => {
      if (obj.name === fromPerson) {
        obj.amountPaid = obj.amountPaid + amount;
        obj.balance = obj.amountReceived - obj.amountPaid;
        return;
      }
      if (obj.name === toPerson) {
        obj.amountReceived = obj.amountReceived + amount;
        obj.balance = obj.amountReceived - obj.amountPaid;
        return;
      }
    });
    setBalanceData(newBalanceData);
    setFromPerson("");
    setAmount("");
    setToPerson("");
    setReason("");

    await axios
      .post(BASE_URL + "/transactions", data, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => setSnackBarMessage(res.data.message))
      .catch((err) => {
        setSnackBarMessage(err.data.message);
      });

    props.onSubmit(data);
  };

  return (
    <Grid container item direction="column" spacing={4} sm={12}>
      <Grid item sm={2}>
        <TextField
          required
          label="Date"
          type="date"
          value={date}
          variant="outlined"
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
      </Grid>
      <Grid container item direction="row" spacing={2} sm={12}>
        <Grid item sm={2} style={{ minWidth: "250px" }}>
          <TextField
            select
            required
            fullWidth
            label="Select your name"
            value={fromPerson}
            variant="outlined"
            onChange={(event) => {
              setFromPerson(event.target.value);
            }}
          >
            {PERSONS.map((person, idx) => (
              <MenuItem key={idx} value={person}>
                <Typography>{person}</Typography>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={2}>
          <TextField
            required
            fullWidth
            label="Amount"
            value={amount}
            type="number"
            variant="outlined"
            onChange={(event) => {
              const val = Number(event.target.value);
              setAmount(val > 0 ? val : "");
            }}
          />
        </Grid>
        <Grid item sm={2} style={{ minWidth: "250px" }}>
          <TextField
            select
            required
            fullWidth
            label={"Used for"}
            value={toPerson}
            variant="outlined"
            onChange={(event) => {
              setToPerson(event.target.value);
            }}
          >
            {EXPENSE_OPTIONS.map((person, idx) => (
              <MenuItem
                disabled={fromPerson === person}
                key={idx}
                value={person}
              >
                <Typography>{person}</Typography>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid item sm={4}>
        <TextField
          fullWidth
          label="Enter Description"
          value={reason}
          type="text"
          variant="outlined"
          onChange={(event) => {
            setReason(event.target.value);
          }}
        />
      </Grid>
      <Grid item sm={2}>
        <Button
          color="primary"
          data-testid="nextButton"
          disabled={!fromPerson || !amount || !toPerson}
          size="small"
          variant="contained"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Grid>

      {snackBarMessage && (
        <SnackBar
          message={snackBarMessage}
          onClose={() => setSnackBarMessage(null)}
        />
      )}
    </Grid>
  );
};
