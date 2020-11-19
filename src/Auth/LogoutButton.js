
import React              from 'react';
import Button             from '@material-ui/core/Button';
import Lock               from '@material-ui/icons/Lock';
import { API, POST_ONLY } from '../api';
import { statusFail }     from './redux';
import { useDispatch }    from 'react-redux';
import styles          from './styles';
import { makeStyles }  from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

export default function LogoutButton(props) {
  const classes  = useStyles();
  const dispatch = useDispatch();
  const logout = ()=> {
    if ( ! API.tokens ) return;
    POST_ONLY('auth/logout',{
      refreshToken:API.tokens.refresh.token
    })
    .then( response =>
      dispatch(statusFail({message:"Logged out!"}))
    );
  }
  return (
  <Button
    {...props}
    onClick={logout}
    color="secondary" variant="contained"
    className={classes.button}
    startIcon={<Lock/>}
  >Logout</Button> );
}
