
import React from 'react';
import Posts from '../Post/Posts';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton, Paper, Typography } from '@material-ui/core';
import { addFriend } from './actions';
import { PersonAdd } from '@material-ui/icons';
import StyledBadge from '../Layout/StyledBadge';
import { useUser } from '../Data/hooks';
import { makeStyles } from "@material-ui/core/styles";
import { paperTheme } from "../styles";
import FlexRow from '../Layout/FlexRow';
import FlexGrow from '../Layout/FlexGrow';
import Show from '../Layout/Show';
import { useSelector } from 'react-redux';
const useStyles = makeStyles( paperTheme );

function User ({id}) {
  const classes = useStyles();
  const user    = useUser(id);
  const me      = useSelector( state => state.auth.user );
  return ! user ? null : (
    <Paper className={classes.root}>
      <FlexRow style={{alignItems:'center'}}>
        <StyledBadge
          overlap="circle"
          online={user.online}
          variant="dot"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
          <Avatar src={user.avatar} className={classes.large}/>
        </StyledBadge>
        <Typography variant="h5" style={{marginLeft:'1ch'}}>
          {user.name}
        </Typography>
        <FlexGrow/>
        <Show when={!me.friends.includes(user.id)}>
          <IconButton onClick={e=>addFriend(user.id)}><PersonAdd/></IconButton>
        </Show>
      </FlexRow>
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
