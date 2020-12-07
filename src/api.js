
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
  const  response = await Axios.get(`/api/${uri}`,body);
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