
import { gql      } from '@apollo/client/core';
import { API      } from '../api';
import { store    } from '../redux';
const  { dispatch } = store;

const updatePosts = gql`
query posts {
  post @rest(type: "Post", path: "post/") {
    name
    message
    images
    author @rest(path: "/user/{info.fieldName}", type: "User") {
      name
      avatar
    }
  }
}`;

export const update = async (id)=> {
  if ( ! API.client ) return;
  const { data } = await API.client.query({
    query: updatePosts
  }); 
  dispatch({type:"posts",posts:data});
};