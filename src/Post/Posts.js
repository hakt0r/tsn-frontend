import { Avatar, Chip, Link, Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import PostTools from "./PostTools";
import { paperTheme } from "../styles";
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
import FlexRow from "../Layout/FlexRow";
import FlexGrow from "../Layout/FlexGrow";
import { Cancel, CommentRounded, Favorite, FavoriteOutlined, FavoriteRounded, WhatsApp } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { Timeline }  from "@material-ui/lab";
import { update }    from "./actions";

const useStyles = makeStyles( paperTheme );
 
const { GET, POST, PUT, DELETE } = require("../api");

const addPost = async ( message, post )=> {
  let uri = `post/`;
  if ( post ) uri = `post/${post.id}`;
  await POST( uri, { message } );
}

const Post = ({classes,post,index,level,root,stack})=> {
  const [ state, setState ] = useState({
    showComments:false,
    addComment:false,
    message:''
  });
  post.author = post.author || { name:'User' };
  return ( <div style={{backgroundColor:'#00000011'}}>
  
  <Typography variant="body2">
    { post.message }
  </Typography>

  { state.addComment ? <>
  <TextField
    multiline
    fullWidth
    autoFocus
    value={state.message}
    onChange={e => setState({...state,message:e.target.value})}
  />
  </> : null }
  <FlexRow>
    <Chip size="small" label={ post.reactions.length } icon={
      <Favorite style={{ color: post.yourReactions.Like ? 'red' : 'black' }}/>
    } />&nbsp;
    <Chip size="small" label={ post.author.name } icon={ <Avatar style={{width:'24px',height:'24px'}} src={post.author.avatar}/> } />&nbsp;
    <Chip size="small" label={ moment(post.createdAt).fromNow() }/>
    <FlexGrow/>
    <Chip size="small"
      label={
        post.comments.length + ' Comments'}
      icon={ <CommentRounded/> }
      clickable
      color={ state.showComment ? 'primary' : 'inherit' }
      onClick={ e => {
        setState({...state,showComment:!state.showComment})}
      }
    />
    <Link onClick={
      e => PUT(`like/post/${post.id}/like`)
    }>Like</Link>
    <Link onClick={
      e => DELETE(`like/post/${post.id}/like`)
    }>Unlike</Link>
    <PostTools post={post}/>&nbsp;
    { state.addComment ? <><Chip size="small" label="Cancel" icon={ <Cancel/> }
      clickable
      color="secondary"
      onClick={ e => setState({...state,addComment:false})}
    />&nbsp; </> : null }
    <Chip size="small" label="Reply" icon={ <WhatsApp/> }
      clickable
      color={ state.addComment ? 'primary' : 'inherit' }
      onClick={ e => {
        addPost(state.message,post);
        setState({...state,addComment:!state.addComment})}
      }
    />
  </FlexRow>
  { ! state.showComments ? post.comments.map( post =>
    <Post key={post.id} {...{post,index,classes,root,level:level+1,stack:[...stack,post]}}/>
  ) : null }
  </div> );
}

export default function Posts({id}){
  const classes = useStyles();
  const [ posts, setPosts ] = useState([]);
  const updates = async ()=> {
    update()
    const result = await GET(id ? `user/posts/${id}` : `post`);
    if ( ! result.response.ok ) return;
    setPosts(result.data);
  };
  useEffect( () => update(), [id] );
  return posts.map( (post,index)=>
    <Paper key={index} className={classes.root}>
      <Post key={index} {...{post,index,classes,root:post,level:0,stack:[]}}/>
    </Paper>
  );
}