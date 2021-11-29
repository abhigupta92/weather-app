import React, { useEffect, useState } from "react";

import isEmpty from "lodash/isEmpty";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "../mui";

type Props = {
  msg?: string;
  onClose: () => void;
};
const Alert = (props: Props): React.ReactElement => {
  const { msg, onClose } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isEmpty(msg)) {
      setOpen(true);
    }
  }, [msg]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      data-testid="weather-alert"
    >
      <DialogTitle id="alert-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
