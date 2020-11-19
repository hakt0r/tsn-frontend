
import React          from 'react';
import Button         from '@material-ui/core/Button';
import LockOpenIcon   from '@material-ui/icons/LockOpen';
import styles          from './styles';
import { makeStyles }  from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

export default function LoginButton(props) {
  const classes = useStyles();
  return ( 
  <Button
    {...props}
    color="primary" variant="contained"
    className={classes.button}
    startIcon={<LockOpenIcon/>}
  >{props.text}</Button> );
}
