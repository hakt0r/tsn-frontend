
import React           from 'react';
import { useSelector } from 'react-redux';

import {
  Route, Switch, useHistory, useParams
} from 'react-router-dom';

import Avatar     from '@material-ui/core/Avatar'
import Grid       from '@material-ui/core/Grid'
import Paper      from '@material-ui/core/Paper'
import Tab        from '@material-ui/core/Tab'
import Table      from '@material-ui/core/Table'
import TableCell  from '@material-ui/core/TableCell'
import TableRow   from '@material-ui/core/TableRow'
import Tabs       from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'

import { useUser, useUsers } from '../Data/hooks';

import Posts       from '../Post/Posts';
import AddPost     from '../Post/AddPost';
import StyledBadge from '../Layout/StyledBadge';
import FlexGrow    from '../Layout/FlexGrow';
import UserTools   from './UserTools';

import { makeStyles }  from "@material-ui/core/styles";
import { paperTheme }  from "../styles";
import { IconButton } from '@material-ui/core';

import Show from '../Layout/Show';
import { addFriend, rejectFriend } from './actions';

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
  const friend = useUser(id);
  return (
  <TableRow key={friend.id}>
    <TableCell>
      <Avatar src={friend.avatar}/>
    </TableCell>
    <TableCell>
      {friend.name}
    </TableCell>
    <TableCell>
      <Show when={incoming}>
        <IconButton onClick={e=>addFriend(friend.id)}>
          approve
        </IconButton>
      </Show>
        <IconButton onClick={e=>rejectFriend(friend.id)}>
          { incoming ? 'reject' : outgoing ? 'withdraw' : 'unfriend' } 
        </IconButton>
    </TableCell>
  </TableRow>);
}

function Friends () {
  const userId = useSelector( s => s.auth.user.id );
  const user   = useUser( userId );
  return <Table>
  { user.friends.map( friend => <Friend id={friend.id||friend}/> )}
  { user.friendRequests.map( friend => <Friend incoming id={friend.id||friend}/> )}
  { user.friendRequestsSent.map( friend => <Friend outgoing id={friend.id||friend}/> )}
  </Table>;
}

export default function MyProfile() {
  const { tab = "main" } = useParams();
  const history = useHistory();
  const user    = useSelector( s => s.auth.user );
  return <>
    <Tabs value={tab} onChange={ (e,tab) => history.push(`/${tab}`) }>
      <Tab label="Timeline" value="main" />
      <Tab label="Friends"  value="friends" />
      <Tab label="Messages" value="messages" />
    </Tabs>
    <User  id={user.id} />
    <Switch>
      <Route path="/friends" component={Friends}/>
      <Route path="/post/add" component={AddPost}/>
      <Route path="/">
        <Posts id={user.id} />
      </Route>
    </Switch>
  </>;
}
