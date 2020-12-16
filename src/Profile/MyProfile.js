
import React           from 'react';
import { useSelector } from 'react-redux';

import {
  Route, Switch, useHistory, useParams
} from 'react-router-dom';

import Tab     from '@material-ui/core/Tab';
import Tabs    from '@material-ui/core/Tabs';
import Posts   from '../Post/Posts';
import AddPost from '../Post/AddPost';
import Friends from './Friends';
import { Message, People, Subject } from '@material-ui/icons';

export default function MyProfile() {
  const { tab = "main" } = useParams();
  const history = useHistory();
  const user    = useSelector( s => s.auth.user );
  return <>
  <Tabs value={tab} onChange={ (e,tab) => history.push(`/${tab}`) }>
    <Tab label={<Subject/>} value="main" />
    <Tab label={<People/>}  value="friends" />
    <Tab label={<Message/>} value="messages" />
  </Tabs>
  <Switch>
    <Route path="/friends"  component={Friends}/>
    <Route path="/">
      <Posts id={user.id} />
    </Route>
  </Switch></>;
}
