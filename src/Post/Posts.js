
import { usePost, useUserPosts } from "../Data/hooks";
import Post from "./Post";

export function PostRef (props){
  const post = usePost( props.post );
  if ( ! post ) return null;
  return <Post {...{...props,post}}/>;
}

export default function Posts({id}){
  const posts = useUserPosts(id);
  if ( ! posts ) return null;
  return posts.map( (post,index)=>
    <Post key={index} {...{userId:id,post,index,root:post,level:0,stack:[]}}/>
  );
}