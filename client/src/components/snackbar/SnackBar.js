import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

export const SnackBar = (props) => {
  const { message, onClose } = props;

  return (
    <>
      {message && (
        <Snackbar
          open
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          style={{ maxWidth: "150px" }}
          autoHideDuration={2000}
          message={message}
          onClose={onClose}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={onClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}
    </>
  );
};
