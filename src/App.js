
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Login    from "./Auth/Login";
import LogoutButton from "./Auth/LogoutButton";
import Register from "./Auth/Register";
import AddPost from "./Post/AddPost";
import Posts from "./Post/Posts";
import Home from "./Profile/Home";
import { themeToggle } from "./theme";

function App() {
  const dispatch = useDispatch();
  return <>
    <Home/>
    <AddPost/>
    <Posts/>
    <Login/>
    <Register/>
    <LogoutButton/>
    <Button
      onClick={ e => dispatch(themeToggle()) }
    >Theme Switch</Button>
  </>;
}

export default App;
