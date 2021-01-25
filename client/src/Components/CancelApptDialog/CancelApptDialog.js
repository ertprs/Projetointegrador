import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  // TextField,
} from '@material-ui/core';
// import useStylesDialog from '../NewEventDialog/stylesDialog';
import handleFetchErrors from '../../utils/handleFetchErrors';

function NewEventDialog({ open, handleClose, appointment, renderNewMeeting, setUpdate }) {
  // const classes = useStylesDialog();

  // const [reason, setReason] = useState('');

  const handleSubmit = () => {
    fetch(`/api/appointments/${appointment.id}`, {
      method: 'DELETE',
    })
      .then(handleFetchErrors)
      .then((res) => {
        setUpdate(true);
        handleClose();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>Confirm to cancel event.</DialogContentText>
        {/* <TextField
          fullWidth
          variant="outlined"
          label="Reason for Cancellation"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Exit</Button>
        <Button onClick={handleSubmit}>Confirm Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewEventDialog;
