
import { store }     from '../redux';
import { GET, POST } from '../api';

const { dispatch } = store;

export const search = async (match,type='User',field='name') => {
  const { data, response } = await POST(
    '/search',
    { match, type, field }
  );
  if ( response.ok ) dispatch(
    { type:'search:results', list:data, match, model:type, field }
  );
};

export const getUser = async (id) => {
  const { data, response } = await GET(`/user/${id}`);
  if ( response.ok ) dispatch({ type:'user:profile', id, data });
};

export const addFriend = async (id) => {
  const { data, response } = await POST(`/friends/approve`,{id});
  if ( response.ok ) await getUser(id);
};