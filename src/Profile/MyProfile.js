
import React, { useEffect } from 'react';
import Posts from '../Post/Posts';
import { Route, useHistory, useParams } from 'react-router-dom';
import { Avatar, Container, Grid, IconButton, Paper, Tab, Table, TableCell, TableRow, Tabs, Typography } from '@material-ui/core';
import { paperTheme } from "../styles";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { addFriend, getUser } from './actions';
import { PersonAdd } from '@material-ui/icons';
import Switch from 'react-bootstrap/esm/Switch';
import AddPost from '../Post/AddPost';

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

function Friends () {
  useEffect( e => getUser(), [] );
  const user = useSelector( s => s.auth.user );
  return <Table>
  {user.friends.map( friend =>
    <TableRow key={friend.id}>
      <TableCell>
        <Avatar src={friend.avatar}/>
      </TableCell>
      <TableCell>
        {friend.name}
      </TableCell>
    </TableRow>
  )}
  </Table>;
}

export default function MyProfile() {
  const { tab } = useParams();
  const history = useHistory();
  const user    = useSelector( s => s.auth.user );
  return <>
    <Tabs value={tab} onChange={ (e,tab) => history.push(`/${tab}`) }>
      <Tab label="Timeline" value="" />
      <Tab label="Friends"  value="friends" />
      <Tab label="Messages" value="messages" />
    </Tabs>
    <Switch>
      <Route path="/friends" component={Friends}/>
      <Route path="/" exact>
        <User  id={user.id} />
        <AddPost/>
        <Posts id={user.id} />
      </Route>
    </Switch>
  </>;
}
