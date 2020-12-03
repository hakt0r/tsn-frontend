const update = async ()=> {
  const result = await GET(id ? `user/posts/${id}` : `post`);
  if ( ! result.response.ok ) return;
  dispatch({type:"posts",result.data);
};