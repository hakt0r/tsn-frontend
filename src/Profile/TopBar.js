
import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Avatar, Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MainMenu from './MainMenu';
import logo     from '../logo.svg';
import Search   from './Search';

const useStyles = makeStyles( theme => ({
  root: {
    display: "flex",
    flexFlow: "row",
    padding: theme.spacing(1),
    position: 'sticky',
    top:0
  },
  height: {
    position:'relative',
    top:'3px',
    marginLeft:theme.spacing(1)
  }
}));

export default function TopBar() {
  const classes  = useStyles();
  const auth     = useSelector( state => state.auth );
  if ( ! auth.tokens ) return null;
  return (
  <AppBar className={classes.root}>
    <Link to="/"><Avatar src={logo}/></Link>
    <Typography
      className={classes.height}
      variant="h4">{auth.user.name}</Typography>
    <span style={{flexGrow:1}}></span>
    <Search/>
    <MainMenu/>
  </AppBar> );
}
