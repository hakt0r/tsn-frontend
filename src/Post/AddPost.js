
import { Button, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import { postTheme } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( postTheme );

const { POST, API } = require("../api");

// POST /api/post/, { message:String }

const addPost = ( message )=> {
  POST( `post/`, { message } );
}

export default function AddPost(){
  const classes = useStyles();
  const [state,setState] = useState({message:''});
  return <Paper className={classes.root}>
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
        onClick={ e => addPost(state.message) }
      >
        Post
      </Button>
    </div>
  </Paper>;
}