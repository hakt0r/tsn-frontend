
import React    from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function StatusSnackbar({values,setValues}) {
  const handleClose = (event, reason) => {
    if ( reason === 'clickaway' ) return;
    setValues({ ...values, showStatus:false });
  };
  return (
  <Snackbar open={ values.showStatus } autoHideDuration={1000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity={ values.status.code ? "error" : "success"}
    >
      { values.status.message }
    </Alert>
  </Snackbar> );
}
