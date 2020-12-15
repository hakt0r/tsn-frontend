
import React           from 'react';
import { useSelector } from 'react-redux';

import {
  Route, Switch, useHistory, useParams
} from 'react-router-dom';

import Avatar     from '@material-ui/core/Avatar'
import Grid       from '@material-ui/core/Grid'
import Paper      from '@material-ui/core/Paper'
import Tab        from '@material-ui/core/Tab'
import Tabs       from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'

import { useUser, useUsers } from '../Data/hooks';

import Posts       from '../Post/Posts';
import AddPost     from '../Post/AddPost';
import FlexGrow    from '../Layout/FlexGrow';

import { makeStyles }  from "@material-ui/core/styles";
import { paperTheme }  from "../styles";
import { IconButton } from '@material-ui/core';

import Show from '../Layout/Show';
import { addFriend, rejectFriend } from './actions';
import { HighlightOff, PersonAddDisabled, ThumbDown, ThumbUp } from '@material-ui/icons';
import FlexRow from '../Layout/FlexRow';

const useStyles = makeStyles( paperTheme );

function User ({id}) {
  const classes  = useStyles();
  const user     = useUser(id);
  const history  = useHistory();
  return ! user ? null : (
    <Paper className={classes.root}>
      <Grid container justify="flex-start" alignItems="center">
        <Grid item>
          
        </Grid>
        <Grid item style={{marginLeft:8}}>
          <Typography variant="h5">{user.name}</Typography>
        </Grid>
        <FlexGrow/>
      </Grid>
    </Paper>
  );
}

function Friend({id,incoming,outgoing}) {
  const friend  = useUser(id);
  const classes = useStyles();
  return (
  <FlexRow key={friend.id} className={classes.row}>
    <Avatar src={friend.avatar}/>
    <Typography variant="h6" style={{marginLeft:'1ch'}}>
      {friend.name}
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

function Friends () {
  const userId = useSelector( s => s.auth.user.id );
  const user   = useUser( userId );
  if ( ! user.friends ) return null;
  return ( <>
  { user.friends.map( friend => <Friend id={friend.id||friend}/> )}
  { user.friendRequests.map( friend => <Friend incoming id={friend.id||friend}/> )}
  { user.friendRequestsSent.map( friend => <Friend outgoing id={friend.id||friend}/> )}
  </> );
}

export default function MyProfile() {
  const { tab = "main" } = useParams();
  const history = useHistory();
  const user    = useSelector( s => s.auth.user );
  return <>
    <Tabs value={tab} onChange={ (e,tab) => history.push(`/${tab}`) }>
      <Tab label="Timeline" value="main" />
      <Tab label="Post"     value="post" />
      <Tab label="Friends"  value="friends" />
      <Tab label="Messages" value="messages" />
    </Tabs>
    <Switch>
      <Route path="/friends" component={Friends}/>
      <Route path="/post/add" component={AddPost}/>
      <Route path="/">
        <Posts id={user.id} />
      </Route>
    </Switch>
  </>;
}
