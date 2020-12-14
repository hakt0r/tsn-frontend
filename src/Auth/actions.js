
import { API, POST, POST_ONLY } from '../Data/api';
import { store } from '../redux';
import Axios from 'axios';

const { dispatch } = store;

export async function requestRegister(){
  const { email, name, password } = store.getState().auth;;

  try {
    const { data } = await Axios.post(
      '/api/auth/register',
      { email, name, password }
    );
    dispatch(statusSuccess(
      data.user, data.tokens, { message : 'Success' }
    ));
  } catch (error) {
    console.log('error',error.response)
    dispatch(statusFail({
      message : error.message,
      code    : error.response.status
    }));
  }
}

export async function requestLogin (){
  const { email, password } = store.getState().auth;;

  try {
    const { data } = await Axios.post(
      '/api/auth/login',
      { email, password }
    );
    dispatch(statusSuccess(
      data.user, data.tokens, { message : 'Success' }
    ));
  } catch (error) {
    console.log('error',error.response)
    dispatch(statusFail({
      message : error.message,
      code    : error.response.status
    }));
  }
}

export function toggleLoginMode(){
  const { register } = store.getState().auth;
  dispatch({type:"auth:toggleLoginMode"})
}

export const logoutRequest = async (dispatch)=> {
  if ( ! API.tokens ) return;
  await Axios.post('/api/auth/logout',{
    refreshToken:API.tokens.refresh.token
  });
  dispatch(statusFail({ message: "Logged out!" }));
}

export const inputChange =
  (key,value) => ({type:'auth:input:change',key,value});

export const toggleShowPassword =
  () => ({type:'auth:toggle:showPassword'});

export const statusHide =
  () => ({type:'auth:status:hide'});

export const statusSuccess =
  (user,tokens,status) => ({type:'auth:status:success',user,tokens,status});

export const statusFail =
  (status) => ({type:'auth:status:fail',status});

export async function checkAuth(){
  try {
    await Axios.post( '/api/auth/test', {} );
  } catch ( error ) {
    dispatch(statusFail( { message:"Logged out!" } ));
  }
}