const { createStore } = require("redux");

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

function authReducer( state, action ){
  switch ( action.type ){
    case 'auth:input:change':
      return { ...state, [action.key]: action.value };
    case 'auth:toggle:showPassword':
      return { ...state, showPassword: !state.showPassword };
    case 'auth:status:hide':
      return { ...state, showStatus: false };
    case 'auth:status:success':
      return { ...state,
        user: action.user,
        tokens: action.tokens,
        status: action.status,
        showStatus: true
      };
    case 'auth:status:fail':
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

export const store = createStore(
  authReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);