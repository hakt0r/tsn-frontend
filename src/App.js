
import { Switch, Route }     from "react-router-dom";
import { IfAuth, IfNotAuth } from "./Auth/redux";
import Login                 from "./Auth/Login";
import TopBar                from "./Profile/TopBar";
import Posts                 from "./Post/Posts";
import UserProfile           from "./Profile/UserProfile";
import CheckAuth             from "./Auth/CheckAuth";
import Center                from "./Layout/Center";
import MyProfile             from "./Profile/MyProfile";
import Background            from "./Layout/Background";
import Logo                  from "./Layout/Logo";
import StatusSnackbar        from "./Auth/StatusSnackbar";

function App() {
  // <StatusSnackbar/>
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
        <Route path="/posts" exact component={Posts}/>
        <Route path="/user/:userId" component={UserProfile} />
        <Route path="/:tab?" component={MyProfile}/>
      </Switch>
    </IfAuth>
  </>;
}

export default App;
