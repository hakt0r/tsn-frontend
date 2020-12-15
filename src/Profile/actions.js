
import { store } from '../redux';
import { Cache } from '../Data/api';

const { dispatch } = store;

export const search = async ( match, type='User', field='name' ) => {
  const { data, response } = await Cache.post(
    '/api/search',
    { match, type, field }
  );
  if ( response.ok ) dispatch(
    { type:'search:results', list:data, match, model:type, field }
  );
};

export const addFriend = async (id) => {
  const response = await Cache.post(`/api/friends/approve`,{id});
  dispatch({type:'user',user:response.data});
};

export const rejectFriend = async (id) => {
  const response = await Cache.post(`/api/friends/reject`,{id});
  dispatch({type:'user',user:response.data});
};