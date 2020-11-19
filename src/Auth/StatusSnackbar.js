
import React    from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { statusHide } from './redux';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function StatusSnackbar() {
  const state = useSelector(
    ({auth:{status,showStatus}}) => ({status,showStatus})
  );
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if ( reason === 'clickaway' ) return;
    dispatch(statusHide());
  };
  return (
  <Snackbar open={ state.showStatus } autoHideDuration={1000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity={ state.status.code ? "error" : "success"}
    >
      { state.status.message }
    </Alert>
  </Snackbar> );
}
