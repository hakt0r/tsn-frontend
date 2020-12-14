
import   Cache   from "./api";
import { store } from "../redux";
import Axios from "axios";
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

export const getUserPostsOnly = (userId)=> {
  Cache.fetch(`/api/user/${userId}/mine`)
  .then( response => dispatch({ type:"user:posts:only", posts: response.data, userId }) )
}

export const getUserPosts = (userId)=> {
  Cache.fetch(`/api/user/${userId}/posts`)
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
  const response = await Axios.patch(`/api/post/${id}`,{ message, images });
  dispatch({ type:"post", post: response.data });
}

export const deletePost = async (id,post)=> {
  const response = await Axios.delete(`/api/post/${id}`);
  dispatch({ type:"post:delete", id });
}