
import { Button }            from "@material-ui/core";
import { useDispatch }       from "react-redux";
import { themeToggle }       from "./theme";
import { Switch, Route }     from "react-router-dom";
import { IfAuth, IfNotAuth } from "./Auth/redux";
import Login                 from "./Auth/Login";
import Home                  from "./Profile/Home";
import TopBar                from "./Profile/TopBar";
import Posts                 from "./Post/Posts";
import UserProfile           from "./Profile/UserProfile";
import CheckAuth             from "./Auth/CheckAuth";
import Center                from "./Layout/Center";
import bg                    from './bg.jpg';
import rindr                 from './rindr.svg';
import MyProfile from "./Profile/MyProfile";
import StatusSnackbar from "./Auth/StatusSnackbar";

function App() {
  const dispatch = useDispatch();
  // <StatusSnackbar/>
  return <>
    <img alt="" src={bg} style={{
      position: "fixed",
      top:0,
      left:0,
      width:'100vw',
      height:'100vh',
      zIndex:-1,
      filter:"blur(3px) grayscale(0.8)",
      opacity:0.025,
      objectFit:'cover'
    }}/>
    <CheckAuth/>
    <IfNotAuth>
      <img alt="" src={rindr} style={{
        position: "fixed",
        top:"10vh",
        left:'50%',
        width:'70vw',
        zIndex:-1,
        transform:'translate(-50%)',
        objectFit:'cover'
      }}/>
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
