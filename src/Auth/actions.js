
import { API, POST, POST_ONLY } from '../api';
import { store } from '../redux';

const { dispatch } = store;

export function requestRegister(){
  const { email, name, password } = store.getState().auth;
  POST( 'auth/register', { email, name, password } )
  .then(
    ({ data, response }) => {
      if ( response.ok ){
        dispatch(statusSuccess(
          data.user, data.tokens, { message : 'Success' }
        ));
      } else {
        dispatch(statusFail({
          message : data.message,
          code : response.status
        }));
      }
    }
  );
}

export function requestLogin (){
  const { email, password } = store.getState().auth;;

  POST( 'auth/login', { email, password } )
  .then(
    ({ data, response }) => {
      if ( response.ok ){
        dispatch(statusSuccess(
          data.user, data.tokens, { message : 'Success' }
        ));
      } else {
        dispatch(statusFail({
          message : data.message,
          code : response.status
        }));
      }
    }
  );
}

export function toggleLoginMode(){
  const { register } = store.getState().auth;
  dispatch({type:"auth:toggleLoginMode"})
}

export const logoutRequest = (dispatch)=> {
  if ( ! API.tokens ) return;
  POST_ONLY('auth/logout',{
    refreshToken:API.tokens.refresh.token
  })
  .then( response =>
    dispatch(statusFail({message:"Logged out!"}))
  );
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

export function checkAuth(){
  const { email, name, password } = store.getState().auth;
  POST( 'auth/test', {} )
  .then(
    ({ data:{user,tokens}, response }) => {
      if ( ! response.ok ){
        dispatch(statusFail({message:"Logged out!"}))
      }
    }
  );
}