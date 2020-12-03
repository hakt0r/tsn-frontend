
import React          from 'react';
import Paper          from '@material-ui/core/Paper';

import PasswordField  from './PasswordField';
import EmailField     from './EmailField';
import NameField      from './NameField';
import LoginButton    from './LoginButton';
import StatusSnackbar from './StatusSnackbar';
import { POST } from '../api';

import { statusFail, statusSuccess } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import styles          from './styles';
import { makeStyles }  from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

export default function Register() {
  const classes  = useStyles();
  const state    = useSelector( state => state.auth );
  const dispatch = useDispatch();
  const submit = e => {
    e.preventDefault();
    requestRegister(state,dispatch);
  }
  return ( <>
  <StatusSnackbar/>
  <Paper className={classes.root}>
    <div><EmailField/></div>
    <div><NameField/></div>
    <div><PasswordField/></div>
    <div style={{display:'flex',flexFlow:'row',justifyContent:'right'}}>
      <LoginButton onClick={submit} text="Register"/>
    </div>
  </Paper></> );
}

function requestLogin ( state, dispatch ){
  const { email, password } = state;

  POST( 'auth/login', { email, password } )
  .then(
    ({ data, response }) => {
      if ( response.ok ){
        dispatch(statusSuccess(
          data.user, data.tokens, { message : 'Success' }
        ));
      } else {
        dispatch(statusFail({
          message : data.message,
          code : response.status
        }));
      }
    }
  );
}