
import React          from 'react';

import Paper          from '@material-ui/core/Paper';

import PasswordField  from './PasswordField';
import EmailField     from './EmailField';
import LoginButton    from './LoginButton';

import { useSelector } from 'react-redux';

import { makeStyles }   from '@material-ui/core/styles';
import { requestLogin, requestRegister, toggleLoginMode } from './actions';
import styles           from './styles';

import logo from "../logo.svg";
import NameField from './NameField';
import { Button, Link } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function InputWithIcon() {
  const classes  = useStyles();
  const { register } = useSelector( state => state.auth );
  const submit = e => {
    e.preventDefault();
    if ( register ) requestRegister();
    else            requestLogin();
  }
  return ( <>
  <Paper className={classes.root}>
    <img alt="" style={{
      position:'absolute',top:0,left:0,
      width:'100%',
      height:'100%',
      objectFit:'contain',
      opacity:0.1}} src={logo}/>
    <div><EmailField/></div>
    { register ? <div><NameField/></div> : null }
    <div><PasswordField/></div>
    <div style={{display:'flex',flexFlow:'row',justifyContent:'right'}}>
      <Button
        className={classes.button}
        color="secondary"
        onClick={ toggleLoginMode }>{
        register ? "Login" : "Register"
      }</Button>
      <span style={{flexGrow:1}}></span>
      <LoginButton onClick={submit} text={ register ? "Register": "Login" }/>
    </div>
    </Paper></> );
}
