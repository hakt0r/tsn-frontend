
import { Axios } from "./api";
import { store } from "../redux";

const { dispatch } = store;

export const getUser = (userId) => {
  Axios.fetch(`/api/user/${userId}`)
  .then( response => {
    if (response.code === 400) return;
    dispatch({ type:"user", user: response.data })
  })
}

export const getUsers = ( arrayOfUserIds ) => {
  arrayOfUserIds.forEach( id => 
    Axios.fetch(`/api/user/${id}`)
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
  Axios.fetch(`/api/post/from/${userId}?before=${before}`)
  .then( response => {
    dispatch({ type:"user:posts:only", posts: response.data, userId })
  })}

export const getUserPosts = ( userId, before  )=> {
  if ( ! before ) {
    dispatch({ type:"user:posts:reset", userId })
    before = Date.now()
  }
  Axios.fetch(`/api/user/${userId}/posts?before=${before}`)
  .then( response => {
    dispatch({ type:"user:posts", posts: response.data, userId })
  })
}

export const getPost = (postId)=> {
  Axios.fetch(`/api/post/${postId}`)
  .then( response => dispatch({ type:"post", post: response.data }) )
}

export const getPosts = (arrayOfUserIds)=> {
  arrayOfUserIds.map( id => 
    Axios.fetch(`/api/post/${id}`)
    .then( response => dispatch({ type:"posts", posts: response.data }) )
  )
}

export const getFriends = (arrayOfUserIds)=> {
  arrayOfUserIds.map( id => 
    Axios.fetch(`/api/friends/`)
    .then( response => dispatch({ type:"friends", friends: response.data }) )
  )
}

export const editPost = async ({id,message,images})=> {
  const response = await Axios.patch(`/api/post/${id}`,{ message, images });
  dispatch({ type:"post", post: response.data });
}

export const deletePost = async (id,post)=> {
  const response = await Axios.delete(`/api/post/${id}`);
  dispatch({ type:"post:delete", id });
}