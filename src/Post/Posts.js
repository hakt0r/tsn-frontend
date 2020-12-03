import { Avatar, Chip, Link, Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import PostTools from "./PostTools";
import { paperTheme } from "../styles";
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
import FlexRow from "../Layout/FlexRow";
import FlexGrow from "../Layout/FlexGrow";
import { Cancel, Favorite, FavoriteOutlined, FavoriteRounded, WhatsApp } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";

const useStyles = makeStyles( paperTheme );
 
const { GET, POST, PUT } = require("../api");

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
  return ( <>
  { level === 0 ? null :
  <Stepper activeStep="current">
    <Step key="origin">
      <StepLabel>
        {root.author.name}
      </StepLabel>
    </Step>
    {stack.map(post =>
    <Step key={post.id}>
      <StepLabel>
        {post.author.name}
      </StepLabel>
    </Step>
    )}
    <Step key="origin">
      <StepLabel>
        {post.author.name}
      </StepLabel>
    </Step>
  </Stepper> }
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
      <Favorite style={{color:post.yourReactions.includes('Like')?'red':'black'}}/>
    } />&nbsp;
    <Chip size="small" label={ post.author.name } icon={ <Avatar style={{width:'24px',height:'24px'}} src={post.author.avatar}/> } />&nbsp;
    <Chip size="small" label={ moment(post.createdAt).fromNow() }/>
    <FlexGrow/>
    <Link onClick={
      e => PUT(`like/post/${post.id}/like`)
    }>Like</Link>
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
  { post.comments.map((post,index) =>
    <Post key={index} {...{post,index,classes,root,level:level+1,stack:[...stack,post]}}/>
  )}
  </> );
}

export default function Posts({id}){
  const classes = useStyles();
  const [ posts, setPosts ] = useState([]);
  const update = async ()=> {
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