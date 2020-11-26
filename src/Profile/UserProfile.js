
import React, { useEffect } from 'react';
import Posts from '../Post/Posts';
import { useParams } from 'react-router-dom';
import { Avatar, Container, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { paperTheme } from "../styles";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { addFriend, getUser } from './actions';
import { PersonAdd } from '@material-ui/icons';

const useStyles = makeStyles( paperTheme );

function User ({id}) {
  const classes  = useStyles();
  const profiles = useSelector( s => s.post.profiles );
  const user = profiles ? profiles[id] : false;
  useEffect( e => getUser(id), [id] );
  return ! user ? null : (
    <Paper className={classes.root}>
      <Grid container justify="left" alignItems="top">
        <Grid item>
          <Avatar src={user.avatar} className={classes.large}/>
        </Grid>
        <Grid item>
          <Typography variant="h5">{user.name}</Typography>
        </Grid>
      </Grid>
      <IconButton onClick={e=>addFriend(user.id)}><PersonAdd/></IconButton>
    </Paper>
  );
}

export default function UserProfile() {
  const { userId } = useParams();
  return <>
    <User  id={userId}/>
    <Posts id={userId}/>
  </>;
}
