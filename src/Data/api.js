
import Axios from 'axios';

export const API = {
  tokens: false
};

window.API        = API;
window.API.POST   = POST;
window.API.GET    = GET;
window.API.DELETE = DELETE;
window.API.PATCH  = PATCH;

export async function GET ( uri, body ) {
  console.warn('deprecated: old api used ' + uri);
  const response = await Axios.get(`/api/${uri}`,body);
  response.ok = true;
  return { response, data: response.data };
}

export async function POST_ONLY ( uri, body ) {
  console.warn('deprecated: old api used ' + uri);
  const  response = await Axios.post(`/api/${uri}`,body);
  response.ok = true;
  return { response, data: response.data };
}

export async function POST ( uri, body ) {
  console.warn('deprecated: old api used ' + uri);
  const  response = await Axios.post(`/api/${uri}`,body);
  response.ok = true;
  return { response, data: response.data };
}

export async function PUT ( uri, body ) {
  console.warn('deprecated: old api used ' + uri);
  const  response = await Axios.put(`/api/${uri}`,body);
  response.ok = true;
  return { response, data: response.data };
}

export async function DELETE ( uri, body ) {
  console.warn('deprecated: old api used ' + uri);
  const  response = await Axios.delete(`/api/${uri}`,body);
  response.ok = true;
  return { response, data: response.data };
}

export async function PATCH ( uri, body ) {
  console.warn('deprecated: old api used ' + uri);
  const  response = await Axios.patch(`/api/${uri}`,body);
  response.ok = true;
  return { response, data: response.data };
}

export default class Cache {
  static byURL = {}
  static async fetch(uri,options){
    options                       = options || {};
    options.headers               = options.headers || {};
    options.headers.authorization = window.API.tokens.access.token;
    const hash = options.hash || uri + '::' + JSON.stringify(options);
    let state = Cache.byURL[hash];
    if ( ! state )
      state = Cache.byURL[hash] = {};
    if ( Cache.STATE_LOADING === state.status ){
      //console.log('join',uri,options)
      return new Promise( resolve => state.waiting.push(resolve) );
    } else if ( state.date > Date.now() - 1000 ) {
      //console.log('cached',uri,options)
      return { ...state.response, data:state.data, json: ()=> state.data };
    } else {
      //console.log('fetch',uri,options)
      state.status  = Cache.STATE_LOADING;
      state.waiting = [];
      const response = await fetch(uri,options);
      const     data = await response.json();
      state.date     = Date.now();
      state.response = response;
      state.data     = data;
      state.status   = Cache.STATE_READY;
      response.json  = ()=> data;
      response.data  = data;
      state.waiting.forEach( resolve => resolve(response) );
      return response;
    }
  }
  static STATE_LOADING = 1;
  static STATE_READY   = 2;
}

API.cache = new Cache();


// const combineResponseAndData = async response =>
//   ({ response, data: await response.json() });

/*
  const result = await POST("/login",{body});
  result.data.message
  result.response.ok
*/

/*
export async function POST_ONLY ( uri, body ) {
  const headers = { 'Content-Type': 'application/json' };
  if ( API.tokens ) headers['Authorization'] = API.tokens.access.token;
  const response = await fetch( `/api/${uri}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  return response;
}

export async function POST ( uri, body ) {
  const headers = { 'Content-Type': 'application/json' };
  if ( API.tokens ) headers['Authorization'] = API.tokens.access.token;
  const response = await fetch( `/api/${uri}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return { data, response };
}

export async function GET ( uri ) {
  const headers = { 'Content-Type': 'application/json' };
  if ( API.tokens ) headers['Authorization'] = API.tokens.access.token;
  const response = await fetch( `/api/${uri}`, { headers });
  const     data = await response.json();
  return { data, response };
}

export async function PUT ( uri ) {
  const headers = { 'Content-Type': 'application/json' };
  if ( API.tokens ) headers['Authorization'] = API.tokens.access.token;
  const response = await fetch( `/api/${uri}`, { method: "PUT", headers });
  const     data = await response.json();
  return { data, response };
}

export async function DELETE ( uri ) {
  const headers = { 'Content-Type': 'application/json' };
  if ( API.tokens ) headers['Authorization'] = API.tokens.access.token;
  const response = await fetch( `/api/${uri}`, { method:'DELETE', headers });
  return { response };
}

export async function PATCH ( uri, body ) {
  const headers = { 'Content-Type': 'application/json' };
  if ( API.tokens ) headers['Authorization'] = API.tokens.access.token;
  const response = await fetch( `/api/${uri}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return { data, response };
}
*/