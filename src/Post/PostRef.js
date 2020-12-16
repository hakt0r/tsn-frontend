

import Post        from "./Post";
import { usePost } from "../Data/hooks";

export function PostRef (props){
  const post = usePost( props.post );
  if ( ! post ) return null;
  return <Post {...props} post={post}/>;
}
