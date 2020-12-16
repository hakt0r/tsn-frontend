import { Avatar } from "@material-ui/core"
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core"
import { useRef, useState } from "react"
import { useSelector } from "react-redux";
import Cache from "../Data/api";
import FlexRow from "../Layout/FlexRow";
import FlexGrow from "../Layout/FlexGrow";

import { store } from "../redux";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { paperTheme } from "../styles";
const useStyles = makeStyles( paperTheme );
const { dispatch } = store;

export default function EditProfile(){
  const classes = useStyles();
  const ref     = useRef();
  const user    = useSelector( state => state.auth.user );
  const defaults = {
    name:   user.name,
    email:  user.email
  };
  const [state,setState] = useState(defaults);
  const avatarUpload = e => {
    const read = new FileReader();
    read.readAsDataURL(e.target.files[0]);
    read.onload = e => {
      Cache.patch(`/api/user/${user.id}`,{avatar:e.target.result});
      dispatch({type:'auth:modify',modify:{avatar:e.target.result}});
    }
  }
  const save = () => {
    const modify = {name:state.name};
    Cache.patch(`/api/user/${user.id}`,modify);
    dispatch({type:'auth:modify',modify});
  }
  const reset = () => setState(defaults);
  return ( <Paper className={classes.root}>
  <FlexRow>
    <input type="file" ref={ref} hidden onChange={avatarUpload}/>
    <Avatar
      style={{width:150,height:150}}
      src={user.avatar}
      onClick={e=>ref.current.click()}
      />
    <div style={{marginLeft:8}}>
    <TextField multiline fullWidth
      label="Name"
      value={state.name}
      onChange={e=>setState({...state,name:e.target.value})}
      style={{marginBottom:8}}
      />
    <TextField multiline fullWidth
      label="eMail"
      value={state.email}
      onChange={e=>setState({...state,email:e.target.value})}
      />
    </div>
  </FlexRow>
  <FlexRow>
    <Button
        onClick={reset}
        variant="contained"
        color="secondary"
    >Reset</Button>
    <FlexGrow/>
    <Button
      onClick={save}
      variant="contained"
      color="primary"
    >Save</Button>
  </FlexRow>
  </Paper> );
}
