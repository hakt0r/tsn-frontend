
import { CircularProgress } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Background from "../Layout/Background";
import Logo from "../Layout/Logo";
import { checkAuth } from "./actions";

const useStyles = makeStyles( theme => ({
  splash: {
      position: 'fixed',
         width: '100vw',
        height: '100vh',
           top: 0,
          left: 0,
        zIndex: 9999,
    background: theme.palette.primary.dark
  },
  spinner: {
      position: 'absolute',
           top: '50%',
          left: '50%',
     transform: 'translate(-50%,-50%'
  }
}));

export default function CheckAuth () {
  const auth = useSelector( state => state.auth );
  const classes = useStyles();
  useEffect( checkAuth, [] );
  if ( auth.tokens || auth.checkFailed ) return null;
  return (
  <div className={classes.splash}>
    <Background/>
    <Logo/>
    <CircularProgress className={classes.spinner}/>
  </div> );
}
