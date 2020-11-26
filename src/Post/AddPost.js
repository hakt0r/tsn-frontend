
import { Button, IconButton, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import { paperTheme } from "../styles";
import { makeStyles } from "@material-ui/core/styles";
import { Comment } from "@material-ui/icons";

const useStyles = makeStyles( paperTheme );

const { POST, API } = require("../api");

// POST /api/post/, { message:String }

const addPost = async ( message, post )=> {
  let uri = `post/`;
  if ( post ) uri = `post/${post.id}`;
  await POST( uri, { message } );
}

export default function AddPost({post}){
  const classes = useStyles();
  const [state,setState] = useState({show:post?false:true,message:''});
  return state.show ? <Paper className={classes.root}>
    <div>
      <TextField
        multiline
        value={state.message}
        onChange={e => setState({...state,message:e.target.value})}
      />
    </div>
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={ async e => { await addPost(state.message,post); if ( post ) setState({show:false,message:''}) } }
      >
        Post
      </Button>
    </div>
  </Paper> : <IconButton
    onClick={ e => setState({...state,show:true})}
  ><Comment/></IconButton>;
}