
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { API, POST_ONLY } from "../api";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import Axios from 'axios';

const authDefaults = {
  email        : 'anx.test.user@gmail.com',
  password     : 'asdasdasdsa8',
  name         : '',
  showPassword : false,
  status       : false,
  showStatus   : false,
  user         : false,
  tokens       : false,
  register     : false 
};

export const IfAuth = ({not,children}) => {
  const auth = useSelector( state => state.auth.tokens );
  return auth ? children : null;
};

export const IfNotAuth = ({not,children}) => {
  const auth = useSelector( state => state.auth.tokens );
  return ! auth ? children : null;
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
  Axios.defaults.headers.common = {
    Authorization : data.tokens.access.token
  }
} catch(e){}

export function authReducer( state=authDefaults, action ){
  switch ( action.type ){
    case 'auth:toggleLoginMode':
      return { ...state, register: !state.register };
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
      }));

      Axios.defaults.headers.common.Authorization =
        action.tokens.access.token;

      //const restLink = new RestLink({ uri: "/api/" });
      //const client = new ApolloClient({
      //  link: restLink,
      //  cache: new InMemoryCache(),
      //});
      //API.client = client;
      return { ...state,
        user: action.user,
        tokens: action.tokens,
        status: action.status,
        showStatus: true,
        // client
      };
    case 'auth:status:fail':
      API.tokens = false;
      API.user   = false;
      localStorage.setItem('tsn-auth',JSON.stringify({ user: false, tokens: false }))
      delete Axios.defaults.headers.common.Authorization
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