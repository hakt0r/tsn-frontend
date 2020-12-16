
import { Cache } from "./api";
import { store } from "../redux";

const { dispatch } = store;

export const getUser = (userId) => {
  Cache.fetch(`/api/user/${userId}`)
  .then( response => {
    if (response.code === 400) return;
    dispatch({ type:"user", user: response.data })
  })
}

export const getUsers = ( arrayOfUserIds ) => {
  arrayOfUserIds.forEach( id => 
    Cache.fetch(`/api/user/${id}`)
    .then( response => {
      if (response.code === 400) return;
      dispatch({ type:"user", user: response.data })
    })
  )
}

export const getUserPostsOnly = ( userId, before )=> {
  if ( ! before ) {
    dispatch({ type:"user:posts:only:reset", userId })
    before = Date.now()
  }
  Cache.fetch(`/api/post/from/${userId}?before=${before}`)
  .then( response => {
    dispatch({ type:"user:posts:only", posts: response.data, userId })
  })}

export const getUserPosts = ( userId, before  )=> {
  if ( ! before ) {
    dispatch({ type:"user:posts:reset", userId })
    before = Date.now()
  }
  Cache.fetch(`/api/user/${userId}/posts?before=${before}`)
  .then( response => {
    dispatch({ type:"user:posts", posts: response.data, userId })
  })
}

export const getPost = (postId)=> {
  Cache.fetch(`/api/post/${postId}`)
  .then( response => dispatch({ type:"post", post: response.data }) )
}

export const getPosts = (arrayOfUserIds)=> {
  arrayOfUserIds.map( id => 
    Cache.fetch(`/api/post/${id}`)
    .then( response => dispatch({ type:"posts", posts: response.data }) )
  )
}

export const getFriends = (arrayOfUserIds)=> {
  arrayOfUserIds.map( id => 
    Cache.fetch(`/api/friends/`)
    .then( response => dispatch({ type:"friends", friends: response.data }) )
  )
}

export const editPost = async ({id,message,images})=> {
  const response = await Cache.patch(`/api/post/${id}`,{ message, images });
  dispatch({ type:"post", post: response.data });
}

export const deletePost = async (id,post)=> {
  const response = await Cache.delete(`/api/post/${id}`);
  dispatch({ type:"post:delete", id });
}