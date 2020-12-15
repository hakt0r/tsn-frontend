
import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Avatar, Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import MainMenu from './MainMenu';
import logo     from '../logo.svg';
import Search   from './Search';
import { IfAuth } from '../Auth/redux';
import { PostAdd } from '@material-ui/icons';
import UserTools from './UserTools';

const useStyles = makeStyles( theme => ({
  root: {
    display: "flex",
    flexFlow: "row",
    padding: theme.spacing(1),
    position: 'sticky',
    alignItems: 'center',
    top:0
  }
}));

export default function TopBar() {
  const classes  = useStyles();
  const history  = useHistory();
  const auth     = useSelector( state => state.auth );
  const user     = auth.user;
  if ( ! auth.tokens ) return null;
  return (
  <AppBar className={classes.root}>
    <Link to="/">
      <Avatar src={user.avatar || logo} className={classes.large}/>
    </Link>&nbsp;
    <Typography variant="h5">
      {auth.user.name}
    </Typography>
    <span style={{flexGrow:1}}></span>
    <IfAuth>
      <Search/>&nbsp;
      <IconButton onClick={ e => history.push("/post/add")}>
        <PostAdd/>
      </IconButton>&nbsp;
      <MainMenu/>
    </IfAuth>
  </AppBar> );
}
