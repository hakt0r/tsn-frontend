
import React           from 'react';
import { useSelector } from 'react-redux';

import Avatar     from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { useUser } from '../Data/hooks';

import FlexGrow    from '../Layout/FlexGrow';

import { makeStyles }  from "@material-ui/core/styles";
import { paperTheme }  from "../styles";
import { IconButton } from '@material-ui/core';

import Show from '../Layout/Show';
import { addFriend, rejectFriend } from './actions';
import { HighlightOff, PersonAddDisabled, ThumbDown, ThumbUp } from '@material-ui/icons';
import FlexRow from '../Layout/FlexRow';
import { Link } from 'react-router-dom';

const useStyles = makeStyles( paperTheme );

function Friend({id,incoming,outgoing}) {
  const friend  = useUser(id);
  const classes = useStyles();
  return (
  <FlexRow key={friend.id} className={`${classes.row} ${incoming?'incoming':outgoing?'outgoing':''}`}>
    <Avatar src={friend.avatar}/>
    <Typography variant="h6" style={{marginLeft:'1ch'}}>
      <Link className={classes.friendLink} to={`/user/${friend.id}`}>
        {friend.name}
      </Link>
    </Typography>
    <FlexGrow/>
    <IconButton onClick={e=>rejectFriend(friend.id)}>
      { incoming
      ? <ThumbDown color="secondary"/>
      : outgoing
      ? <HighlightOff color="secondary"/>
      : <PersonAddDisabled color="secondary"/> } 
    </IconButton>
    <Show when={incoming}>
      <IconButton onClick={e=>addFriend(friend.id)}>
        <ThumbUp color="primary"/>
      </IconButton>
    </Show>
  </FlexRow> );
}

export default function Friends () {
  const userId = useSelector( s => s.auth.user.id );
  const user   = useUser( userId );
  if ( ! user.friends ) return null;
  return ( <>
  { user.friends.map( (friend,index) => <Friend key={index} id={friend.id||friend}/> )}
  { user.friendRequests.map( (friend,index) => <Friend key={index} incoming id={friend.id||friend}/> )}
  { user.friendRequestsSent.map( (friend,index) => <Friend key={index} outgoing id={friend.id||friend}/> )}
  </> );
}