
import { store } from '../redux';
import { Axios } from '../Data/api';

const { dispatch } = store;

export const search = async ( match, type='User', field='name' ) => {
  const response = await Axios.post(
    '/api/search',
    { match, type, field }
  );
  if ( response.ok ) dispatch(
    { type:'search:results', list:response.data, match, model:type, field }
  );
};

export const addFriend = async (id) => {
  const response = await Axios.post(`/api/friends/approve`,{id});
  dispatch({type:'user',user:response.data});
};

export const rejectFriend = async (id) => {
  const response = await Axios.post(`/api/friends/reject`,{id});
  dispatch({type:'user',user:response.data});
};