
import { useUserPosts } from "../Data/hooks";
import Post             from "./Post";

export default function Timeline({id}){
  const posts = useUserPosts(id);
  if ( ! posts ) return null;
  return posts.map( (post,index)=>
    <Post key={index} {...{userId:id,post,index,root:post,level:0,stack:[]}}/>
  );
}