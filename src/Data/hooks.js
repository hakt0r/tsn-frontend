
import { useMemo }     from "react";
import { useEffect }   from "react";
import { useSelector } from "react-redux";

import {
  getPost, getUser, getUserPosts, getUserPostsOnly, getUsers
} from "./actions";

export function useUser(id) {
  id = id.id ? id.id : id;
  useEffect( e => getUser(id), [id]);
  const  user = useSelector( state => state.cache.user[id] );
  return user || { name:'Loading...', id };
}

export function useUsers(list) {
  const userCache = useSelector( state => state.cache.user );
  const users = useMemo(
    () => {
      const missing = [], have = [];
      list.forEach( user => {
        const cached = userCache[user];
        if ( cached ) have.push(cached);
        else       missing.push(user);
      });
      if ( missing.length > 0 ) getUsers(missing);
      return have;
    }, [ list, userCache ]
  );
  return users || [];
}

export function usePost(id) {
  const post = useSelector( state => state.cache.post[id] );
  useEffect( e => { if ( ! post ) getPost(id) }, [id,post]);
  return post;
}

export function useUserPosts(id) {
  const post = useSelector( state => state.cache.postsFor[id] ) || [];
  const lastPostId = post[post.length-1];
  const lastPost = useSelector( state => state.cache.post[lastPostId] );
  const lastDate = lastPost
  ? (new Date(lastPost.createdAt)).getTime()
  : Date.now();
  useEffect( e => getUserPosts(id), [id]);
  useEffect(
    e => {
      window.loadMore = async ()=> getUserPosts(id,lastDate);
      return e => window.loadMore = false
    },[id,lastDate]);
  return post || [];
}

export function useUserPostsOnly(id) {
  const post = useSelector( state => state.cache.postsOnlyFor[id] ) || [];
  const lastPostId = post[post.length-1];
  const lastPost = useSelector( state => state.cache.post[lastPostId] );
  const lastDate = lastPost
  ? (new Date(lastPost.createdAt)).getTime()
  : Date.now();
  useEffect( e => getUserPostsOnly(id), [id]);
  useEffect(
    e => {
      console.log('arm')
      window.loadMore = async ()=> getUserPostsOnly(id,lastDate);
      return e => window.loadMore = false
    },[id,lastDate]);
  return post || [];
}

