import { API } from "../api";

const authDefaults = {
  email        : 'anx.test.user@gmail.com',
  password     : 'asdasdasdsa8',
  name         : '',
  showPassword : false,
  status       : false,
  showStatus   : false,
  user         : false,
  tokens       : false
};

try {
  const json = localStorage.getItem('tsn-auth');
  const data = JSON.parse(json);
  Object.assign(authDefaults,data,{
    status: { message: 'Loaded auth' },
    showStatus: true
  });
  API.tokens = data.tokens;
  API.user   = data.user;
} catch(e){}

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

export function authReducer( state=authDefaults, action ){
  switch ( action.type ){
    case 'auth:input:change':
      return { ...state, [action.key]: action.value };
    case 'auth:toggle:showPassword':
      return { ...state, showPassword: !state.showPassword };
    case 'auth:status:hide':
      return { ...state, showStatus: false };
    case 'auth:status:success':
      API.tokens = action.tokens;
      API.user   = action.user;
      localStorage.setItem('tsn-auth',JSON.stringify({
        user: action.user,
        tokens: action.tokens
      }))
      return { ...state,
        user: action.user,
        tokens: action.tokens,
        status: action.status,
        showStatus: true
      };
    case 'auth:status:fail':
      API.tokens = false;
      API.user   = false;
      return { ...state,
        user: false,
        tokens: false,
        status: action.status,
        showStatus: true
      };
    case '@@INIT': return authDefaults;
    default:       return state;
  }
}
