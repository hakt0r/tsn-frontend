import PostTools      from "./PostTools";
import { makeStyles } from "@material-ui/core/styles";
import moment         from 'moment';
import FlexRow        from "../Layout/FlexRow";
import FlexGrow       from "../Layout/FlexGrow";
import { fade, TextField }  from "@material-ui/core";
import { Link }       from 'react-router-dom';

import {
  POST, PUT, DELETE
} from "../Data/api";

import {
  useState
} from "react";

import {
  useDispatch
} from "react-redux";

import {
  Avatar, Badge, Button, Typography
} from "@material-ui/core";

import {
  Cancel, CommentRounded, Favorite, WhatsApp
} from "@material-ui/icons";

import { useUser } from "../Data/hooks";
import { PostRef } from "./Posts";
import { IconButton } from "@material-ui/core";
import { Grow } from "@material-ui/core";

import Show from "../Layout/Show";

const useStyles = makeStyles( theme => ({
  postEdge: {
    position:'absolute',
    width: theme.spacing(1),
    height: '100%',
    top:0, left:0,
    backgroundColor: fade(theme.palette.primary.light,0.2),
  },
  postBody: {
    padding:theme.spacing(2),
    paddingLeft:theme.spacing(3),
  },
  post: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderBottom: `${fade(theme.palette.primary.light,0.2)} solid 1px`,
    marginTop: theme.spacing(1),
    position:'relative',
    "& a:visited": {
      color: 'white'
    },
    "& a:hover": {
      color: 'white'
    }
  },
  microLink:{
    fontSize: 10,
    cursor: 'pointer',
    color: theme.palette.primary.light
  }
}));

const addPost = async ( message, post )=> {
  let uri = `post/`;
  if ( post ) uri = `post/${post.id}`;
  await POST( uri, { message } );
}

export default function Post ({post,index,level,root,stack,userId}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ state, setState ] = useState({
    showComments:  false,
    addComment:    false,
    edit:          false,
    message:       "",
    editedMessage: post.message,
  });
  post.author = useUser(post.author);
  return ( <div className={classes.post}>
  <div className={classes.postEdge}></div>
  <div className={classes.postBody}>
    <FlexRow>

      <Link to={`/user/${post.author.id}`}>
        <Avatar style={{width:'24px',height:'24px'}} src={post.author.avatar}/>
      </Link>&nbsp;

      <Link to={`/user/${post.author.id}`}>
        { post.author.name }
      </Link>&nbsp;

      <Button size="small">
        { moment(post.createdAt).fromNow() }
      </Button>

      <FlexGrow/>
      
      { post.comments.length > 0
      ? <><IconButton size="small"
          color={ state.showComments ? 'primary' : 'inherit' }
          onClick={ e => { setState({...state,showComments:!state.showComments})}
        }>
          <Badge badgeContent={post.comments.length} color="primary">
            <CommentRounded/>
          </Badge>
        </IconButton>&nbsp;</>
      : null }

      <Show when={state.addComment}>
        <IconButton size="small"
          color="secondary"
          onClick={ e => setState({...state,addComment:false})}
        ><Cancel/></IconButton >
      </Show>

      <IconButton size="small"
        color={ state.addComment ? 'primary' : 'inherit' }
        onClick={ e => {
          if ( state.addComment ) addPost(state.message,post);
          setState({...state,addComment:!state.addComment})
      }}><WhatsApp/></IconButton >

      <IconButton size="small"
        onClick={
        e => post.yourReactions.Like
          ? DELETE(`like/post/${post.id}/like`).then( ({data})=> dispatch({type:"posts:update:one",data,userId}))
          : PUT(`like/post/${post.id}/like`   ).then( ({data})=> dispatch({type:"posts:update:one",data,userId}))
      }>
        <Badge badgeContent={post.reactions.length} color="primary">
          <Favorite style={{ color: post.yourReactions.Like ? 'red' : 'black' }}/>
        </Badge>
      </IconButton>&nbsp;

      <PostTools post={post} edit={e => setState({ ...state, edit:!state.edit}) }/>

    </FlexRow>

    <Typography variant="body1">
    { state.edit
    ? <TextField
        multiline
        fullWidth
        autoFocus
        value={state.editedMessage}
        onChange={e => setState({...state,editedMessage:e.target.value})}
      />
    : post.message }
      
    </Typography>

    { state.addComment
    ? <><TextField
        multiline
        fullWidth
        autoFocus
        value={state.message}
        onChange={e => setState({...state,message:e.target.value})}
      /></>
    : null }

    <FlexRow>
      <FlexGrow/>
      <Show when={post.comments.length > 0}>
        <a className={classes.microLink} onClick={ e => { setState({...state,showComments:!state.showComments})}}>
          { state.showComments
          ? 'Hide comments'
          : `${post.comments.length} Comments` 
        }
        </a>
      </Show>
    </FlexRow>
  </div>

  <Show when={state.showComments}>
    { post.comments.map( post =>
      <Grow>
        <PostRef key={post} {...{post,index,classes,root,level:level+1,stack:[...stack,post]}}/>
      </Grow>
    )}
  </Show>
  </div> );
}