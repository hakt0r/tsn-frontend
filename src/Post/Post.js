
import PostTools      from "./PostTools";
import { makeStyles } from "@material-ui/core/styles";
import moment         from 'moment';
import FlexRow        from "../Layout/FlexRow";
import FlexGrow       from "../Layout/FlexGrow";
import { Link }       from 'react-router-dom';

import {
  fade, TextField
} from "@material-ui/core";

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
  Cancel, Favorite, WhatsApp
} from "@material-ui/icons";

import { useUser } from "../Data/hooks";
import { PostRef } from "./PostRef";
import { IconButton } from "@material-ui/core";

import Show from "../Layout/Show";
import { editPost } from "../Data/actions";
import Cache from "../Data/api";

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
    "&.comment": {
      "&.first": {
        borderTop:`solid 1px ${theme.palette.divider}`
      },
      margin: 0,
      borderRadius: 0,
      background:'none',
    },
    overflow: 'hidden',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderBottom: `${fade(theme.palette.primary.light,0.2)} solid 1px`,
    marginTop: theme.spacing(1),
    position:'relative',
    borderBottom: `solid 1px ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    background: `linear-gradient(180deg, transparent 96%, ${theme.palette.divider} 100%)`,
    "& a:visited": {
      color: 'white'
    },
    "& a:hover": {
      color: 'white'
    }
  },
  microLinks:{
    fontSize: 10,
    clear: 'both',
    opacity: 0.8,
    "& > *":{
      fontSize: 10,
    },
    "& > a":{
      cursor: 'pointer',
      color: theme.palette.primary.light
    }
  }
}));

const addPost = async ( message, post )=> {
  await Cache.post( `/api/post/${post.id}`, { message } );
}

function EditPost({message,submit,cancel}){
  const [ text, setText ] = useState(message);
  return <div>
  <TextField
    multiline
    fullWidth
    autoFocus
    value={text}
    onChange={e => setText(e.target.value)}
  />
  <FlexRow>
      <Button size="small"
        color="secondary"
        onClick={e => cancel()}
      ><Cancel/></Button>
    <FlexGrow/>
      <Button size="small"
          color="primary"
          onClick={e => submit(text)}
      ><WhatsApp/></Button >
  </FlexRow>
  </div>
}

export default function Post ({post,index,level}) {
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
  const hideEditor = ()=> setState({...state,editPost:false});
  const style = level === 0
    ? classes.post
    : index === 0
    ? `${classes.post} comment first`
    : `${classes.post} comment`;
  return ( <div className={style}>
  <div className={classes.postEdge}></div>
  <div className={classes.postBody}>
    <span style={{float:"right",display:'inline-block',width:'auto'}}>

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
          ? Cache.delete(`/api/like/post/${post.id}/like`).then( ({data})=> dispatch({type:"post",post:data}))
          : Cache.put(`/api/like/post/${post.id}/like`   ).then( ({data})=> dispatch({type:"post",post:data}))
      }>
        <Badge badgeContent={post.reactions.length} color="primary">
          <Favorite style={{ color: post.yourReactions.Like ? 'red' : 'black' }}/>
        </Badge>
      </IconButton>&nbsp;

      <PostTools
        post={post}
        edit={e => setState({ ...state, edit:!state.edit}) }
      />

    </span>

    <Typography variant="body1">
    { state.edit
    ? <EditPost
        message={post.message}
        submit={(message)=>hideEditor(editPost({id:post.id,message}))}
        cancel={hideEditor}
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

    <FlexRow className={classes.microLinks}>
      <Link to={`/user/${post.author.id}`}>
        <Avatar style={{width:'14px',height:'14px'}} src={post.author.avatar}/>
      </Link>&nbsp;

      <Link to={`/user/${post.author.id}`}>
        { post.author.name }
      </Link>

      &nbsp;|&nbsp;
      
      <span>
        { moment(post.createdAt).fromNow() }
        { post.updatedAt === post.createdAt
        ? null
        : ` (edited ${moment(post.updatedAt).fromNow()})` }
      </span>

      <FlexGrow/>
            
      <Show when={post.comments.length > 0}>
        <a onClick={ e => { setState({...state,showComments:!state.showComments})}}>
          { state.showComments
          ? 'Hide comments'
          : `${post.comments.length} Comments` 
        }
        </a>
      </Show>
    </FlexRow>
  </div>

  <Show when={state.showComments}>
    { post.comments.map( (post,index) =>
      <PostRef key={post} {...{post,index,classes,level:level+1}}/>
    )}
  </Show>
  </div> );
}