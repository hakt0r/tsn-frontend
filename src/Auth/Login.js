
import React          from 'react';

import Paper          from '@material-ui/core/Paper';

import useStyles      from './styles';
import PasswordField  from './PasswordField';
import EmailField     from './EmailField';
import LoginButton    from './LoginButton';
import StatusSnackbar from './StatusSnackbar';

import { POST }       from '../api';

import { statusFail, statusSuccess } from '../redux';
import { useDispatch, useSelector } from 'react-redux';

function requestLogin(state,dispatch){
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

export default function InputWithIcon() {
  const classes  = useStyles();
  const state    = useSelector( state => state );
  const dispatch = useDispatch();
  const submit = e => {
    e.preventDefault();
    requestLogin(state,dispatch);
  }
  const test = e => (
    POST('auth/test',{})
    .then( e => console.log('success') )
  )
  return ( <>
  <StatusSnackbar/>
  <Paper className={classes.root}>
    <div><EmailField/></div>
    <div><PasswordField/></div>
    <div><LoginButton onClick={submit} text="Login"/></div>
    <div><LoginButton onClick={test} text="Test"/></div>
  </Paper></> );
}
