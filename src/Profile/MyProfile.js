
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
    <Route path="/friends"  component={Friends}/>
    <Route path="/post/add" component={AddPost}/>
    <Route path="/">
      <Posts id={user.id} />
    </Route>
  </Switch></>;
}
