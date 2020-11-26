
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Login    from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Profile/Home";
import TopBar from "./Profile/TopBar";
import { themeToggle } from "./theme";
import { Switch, Route } from "react-router-dom";
import { IfAuth, IfNotAuth } from "./Auth/redux";
import Posts from "./Post/Posts";
import UserProfile from "./Profile/UserProfile";

function Center({children}){
  return <div
    style={{
      position:"fixed",
      width:"fit-content",
      height:"fit-content",
      top:"50%",
      left:"50%",
      translate:"translate(-50%,-50%)"
    }}
  >{children}</div>;
}

function App() {
  const dispatch = useDispatch();
  return <>
    <TopBar/>
    <IfNotAuth>
      <Center>
        <Login/>
      </Center>
    </IfNotAuth>
    <IfAuth>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/posts" exact component={Posts}/>
        <Route path="/auth/login" exact component={Login} />
        <Route path="/auth/register" exact component={Register} />
        <Route path="/user/:userId" component={UserProfile} />
        <Route path="/auth/register" exact component={Register} />
        <Route path="/settings">
          <Button onClick={ e => dispatch(themeToggle()) }>
            Theme Switch
          </Button>
        </Route>
      </Switch>
    </IfAuth>
  </>;
}

export default App;
