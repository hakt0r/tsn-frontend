
import React           from 'react';
import { useSelector } from 'react-redux';

import {
  Route, Switch, useHistory, useParams
} from 'react-router-dom';

import Tab  from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import {
  Message, People, Subject, Timeline as TimelineIcon
} from '@material-ui/icons';

import Posts    from '../Post/Posts';
import Timeline from '../Post/Timeline';
import Friends  from './Friends';

export default function MyProfile() {
  const { tab = "main" } = useParams();
  const history = useHistory();
  const user = useSelector( s => s.auth.user );

  console.log(user)
  if ( ! user.id ) debugger

  return <>
  <Tabs value={tab} onChange={ (e,tab) => history.push(`/${tab}`) }>
    <Tab label={<TimelineIcon/>} value="main" />
    <Tab label={<Subject/>}  value="posts" />
    <Tab label={<People/>}   value="friends" />
    <Tab label={<Message/>}  value="messages" />
  </Tabs>
  <Switch>
    <Route path="/friends" component={Friends}/>
    <Route path="/posts"><Posts id={user.id} /></Route>
    <Route path="/"><Timeline id={user.id} /></Route>
  </Switch></>;
}
