
import { Switch, Route }     from "react-router-dom";
import { IfAuth, IfNotAuth } from "./Auth/redux";
import Login                 from "./Auth/Login";
import TopBar                from "./Profile/TopBar";
import UserProfile           from "./Profile/UserProfile";
import CheckAuth             from "./Auth/CheckAuth";
import Center                from "./Layout/Center";
import MyProfile             from "./Profile/MyProfile";
import EditProfile           from "./Profile/Edit";
import Background            from "./Layout/Background";
import Logo                  from "./Layout/Logo";
import StatusSnackbar        from "./Auth/StatusSnackbar";
import AddPost from "./Post/AddPost";
function App() {
  <StatusSnackbar/>
  return <>
    <CheckAuth/>
    <Background/>
    <IfNotAuth>
      <Logo/>
      <Center>
        <Login/>
      </Center>
    </IfNotAuth>
    <IfAuth>
      <TopBar/>
      <Switch>
        <Route path="/user/:userId" component={UserProfile} />
        <Route path="/post/add" component={AddPost}/>
        <Route path="/profile/edit" component={EditProfile} />
        <Route path="/:tab?" component={MyProfile}/>
      </Switch>
    </IfAuth>
  </>;
}

export default App;
