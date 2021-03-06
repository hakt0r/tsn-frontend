
import { Axios } from '../Data/api';
import { store } from '../redux';

const { dispatch } = store;

Axios.dispatch = dispatch;

export async function requestRegister(){
  const { email, name, password } = store.getState().auth;
  try {
    const { data } = await Axios.post(
      '/api/auth/register',
      { email, name, password }
    );
    statusSuccess( data.user, data.tokens, { message : 'Success' });
  } catch (error) {
    console.log('error',error.response);
    statusFail({ message: error.message, code: error.response.status });
  }
}

export async function requestLogin (){
  const { email, password } = store.getState().auth;
  try {
    const { data } = await Axios.post(
      '/api/auth/login',
      { email, password }
    );
    statusSuccess( data.user, data.tokens, { message : 'Success' } );
  } catch (error) {
    console.log('error',error.response)
    statusFail({ message: error.message, code: 401 });
  }
}

export function toggleLoginMode(){
  dispatch({ type: "auth:toggleLoginMode" });
}

export const logoutRequest = async (dispatch)=> {
  if ( ! Axios.tokens ) return;
  try {
    await Axios.post('/api/auth/logout',{
      refreshToken: Axios.tokens.refresh.token
    });
  } catch ( error ){}
  statusFail({ message: "Logged out!" });
}

export const inputChange =
  ( key, value ) => ({type:'auth:input:change',key,value});

export const toggleShowPassword =
  () => ({type:'auth:toggle:showPassword'});

export const statusHide =
  () => ({type:'auth:status:hide'});

export const statusSuccess = ( user, tokens, status ) =>
  dispatch({ type: 'auth:status:success', user, tokens, status });

export const statusFail = (status) =>
  dispatch({ type: 'auth:status:fail', status });

export async function checkAuth(){
  try {
    const json = localStorage.getItem('tsn-auth');
    const data = JSON.parse(json);
    await Axios.post(
      '/api/auth/test', {},
      { headers: { Authorization: data.tokens.access.token }
    });
    Axios.tokens = data.tokens;
    Axios.user   = data.user;
    statusSuccess( 
      data.user,
      data.tokens,
      `Welcome back ${data.user.name}`
    );
  } catch ( error ) {
    statusFail( { message:"Logged out!" } );
  }
}