import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import PostTools from "./PostTools";
import { postTheme } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( postTheme );

const { GET, POST } = require("../api");

export default function Posts(){
  const classes = useStyles();
  const [ posts, setPosts ] = useState([]);
  useEffect( ()=> ( async ()=> {
    const result = await GET('post/');
    console.log(result);
    if ( ! result.response.ok ) return;
    setPosts(result.data);
  })(),[]);
  return posts.map( (post,index)=>
  <Paper key={index} className={classes.root}>
    { post.message }
    <PostTools post={post}/>
  </Paper>);
}