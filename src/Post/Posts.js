import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import PostTools from "./PostTools";
import AddPost from "./AddPost";
import { paperTheme } from "../styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( paperTheme );

const { GET } = require("../api");

const Post = ({classes,post,index})=>
  <Paper key={index} className={classes.root}>
    { post.message }
    <AddPost post={post}/>
    <PostTools post={post}/>
    { post.comments.map((post,index) => <Post key={index} {...{post,index,classes}}/>) }
  </Paper>;

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
    <Post key={index} {...{post,index,classes}}/>
  );
}