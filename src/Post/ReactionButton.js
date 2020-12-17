
import { useDispatch }   from "react-redux";
import { Badge, Button } from "@material-ui/core";
import { Favorite }      from "@material-ui/icons";

export default ({post})=> {
  const dispatch = useDispatch();
  post.yourReactions = post.yourReactions || [];
  post.reactions = post.reactions || [];
  return (
  <Button size="small"
    onClick={
    e => post.yourReactions.Like
      ? Axios.delete(`/api/like/post/${post.id}/like`).then( ({post})=> dispatch({type:"post",post}))
      : Axios.put(`/api/like/post/${post.id}/like`   ).then( ({post})=> dispatch({type:"post",post}))
  }>
    <Badge badgeContent={post.reactions.length} color="primary">
      <Favorite style={{ color: post.yourReactions.Like ? 'red' : 'black' }}/>
    </Badge>
  </Button> );
}