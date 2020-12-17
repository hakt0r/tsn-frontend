
import { useUserPostsOnly } from "../Data/hooks";
import { PostRef }          from "./PostRef";

export default function Posts({id}){
  const posts = useUserPostsOnly(id);
  if ( ! posts ) return null;
  return posts.map( (post,index)=>
    <PostRef key={index} {...{post,index,level:0}}/>
  );
}