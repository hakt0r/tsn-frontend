
import React             from 'react';
import Button            from '@material-ui/core/Button';
import Lock              from '@material-ui/icons/Lock';
import { useDispatch }   from 'react-redux';
import styles            from './styles';
import { makeStyles }    from '@material-ui/core/styles';
import { logoutRequest } from './redux';

const useStyles = makeStyles(styles);

export default function LogoutButton(props) {
  const classes  = useStyles();
  const dispatch = useDispatch();
  return (
  <Button
    {...props}
    onClick={ e => logoutRequest(dispatch) }
    color="secondary" variant="contained"
    className={classes.button}
    startIcon={<Lock/>}
  >Logout</Button> );
}
