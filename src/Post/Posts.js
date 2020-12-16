
import { useUserPostsOnly } from "../Data/hooks";
import Post                 from "./Post";

export default function Posts(props){
  console.log('Post',props)
  const { id } = props;
  const posts = useUserPostsOnly(id);
  if ( ! posts ) return null;
  return posts.map( (post,index)=>
    <Post key={index} {...{userId:id,post,index,root:post,level:0,stack:[]}}/>
  );
}