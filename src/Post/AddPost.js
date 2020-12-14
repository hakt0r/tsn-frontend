
import { Button, IconButton, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import { paperTheme } from "../styles";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import FlexGrow from "../Layout/FlexGrow";
import { Grid } from "@material-ui/core";
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { useRef } from "react";
import { EmojiEmotions } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";
import Show from '../Layout/Show';

const useStyles = makeStyles( paperTheme );

const { POST, API } = require("../Data/api");

const addPost = async ( message, post )=> {
  let uri = `post/`;
  if ( post ) uri = `post/${post.id}`;
  await POST( uri, { message } );
}

function insertAtCursor(myField, myValue) {
  if (document.selection) {
      myField.focus();
      const sel = document.selection.createRange();
      sel.text = myValue;
  }
  else if (myField.selectionStart || myField.selectionStart == '0') {
      const startPos = myField.selectionStart;
      const endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
          + myValue
          + myField.value.substring(endPos, myField.value.length);
  } else {
      myField.value += myValue;
  }
  return myField.value;
}

export default function AddPost({post}){
  const classes = useStyles();
  const history = useHistory();
  const ref     = useRef()
  const [state,setState] = useState('');
  const [showEmojis,setShowEmojis] = useState(false);
  const addEmoji = (e,emoji) => {
    setShowEmojis(false);
    ref.current.focus()
    console.log(emoji)
    setState(insertAtCursor(ref.current,emoji.emoji));
  };
  const toggleEmojis = (e)=>{
    e.preventDefault()
    setShowEmojis( ! showEmojis );
  };
  return <Paper className={classes.root}>
    <div>
      <Show when={showEmojis}>
        <div style={{
          position:'absolute',
          zIndex:1
        }}>
          <Picker
            onEmojiClick={addEmoji}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{smileys_people:"PEOPLE"}}
          />
        </div>
      </Show>
      <TextField
        ref={ref}
        fullWidth
        multiline
        value={state}
        onChange={e => setState(e.target.value)}
        InputProps={{endAdornment:
          <InputAdornment position="end">
            <IconButton
              onClick={toggleEmojis}
              onMouseDown={ e => e.preventDefault() }
            >
              <EmojiEmotions/>
            </IconButton>
          </InputAdornment>
        }}
      />
    </div>
    <Grid container>
      <Button
        variant="contained"
        color="secondary"
        onClick={ e => history.goBack() }
      >
        Cancel
      </Button>
      <FlexGrow/>
      <Button
        variant="contained"
        color="primary"
        onClick={ async e => {
          await addPost(state,post);
          history.push('/');
          if ( post ) setState('');
        }}
      >Post</Button>
    </Grid>
  </Paper>;
}