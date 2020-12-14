
import Post from "./Post";

export function PostRef (props){
  const post = usePost( props.post );
  if ( ! post ) return null;
  return <Post {...props} post={post}/>;
}
