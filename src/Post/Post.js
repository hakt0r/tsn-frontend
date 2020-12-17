
import moment         from 'moment';
import PostTools      from "./PostTools";
import FlexRow        from "../Layout/FlexRow";
import FlexGrow       from "../Layout/FlexGrow";
import { Link }       from 'react-router-dom';
import TextField      from "@material-ui/core/TextField";

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
import Axios from "../Data/api";

import useStyles from './styles';

const addPost = async ( message, post )=> {
  await Axios.post( `/api/post/${post.id}`, { message } );
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
          ? Axios.delete(`/api/like/post/${post.id}/like`).then( ({data})=> dispatch({type:"post",post:data}))
          : Axios.put(`/api/like/post/${post.id}/like`   ).then( ({data})=> dispatch({type:"post",post:data}))
      }>
        <Badge badgeContent={(post.reactions.find( r => r.type === 'Like') || {users:[]}).users.length} color="primary">
          <Favorite style={{ color: post.yourReactions.Like ? 'red' : 'black' }}/>
        </Badge>
      </IconButton>&nbsp;

      <PostTools
        post={post}
        edit={e => setState({ ...state, edit:!state.edit}) }
      />

    </span>

    { state.edit
    ? <EditPost
        message={post.message}
        submit={(message)=>hideEditor(editPost({id:post.id,message}))}
        cancel={hideEditor}
      />
    : <>
      <Show when={post.images.length > 0}>
        <img
          style={{maxWidth:'100%',borderRadius:'10px',marginTop:8}}
          src={post.images[0]}
        />
      </Show>
      <Typography variant="body1">
        {post.message}
      </Typography>
    </>}
      

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