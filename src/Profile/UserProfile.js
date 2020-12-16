
import React from 'react';
import Posts from '../Post/Posts';
import { useParams } from 'react-router-dom';
import { Avatar, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { addFriend } from './actions';
import { PersonAdd } from '@material-ui/icons';
import StyledBadge from '../Layout/StyledBadge';
import { useUser } from '../Data/hooks';
import { makeStyles } from "@material-ui/core/styles";
import { paperTheme } from "../styles";
const useStyles = makeStyles( paperTheme );

function User ({id}) {
  const classes = useStyles();
  const user    = useUser(id);
  return ! user ? null : (
    <Paper className={classes.root}>
      <Grid container justify="flex-start" alignItems="flex-start">
        <Grid item>
          <StyledBadge
            overlap="circle"
            online={user.online}
            variant="dot"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar src={user.avatar} className={classes.large}/>
          </StyledBadge>
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
