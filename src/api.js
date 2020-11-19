
export const API = {
  tokens: false
};

window.API = API;
window.API.POST = POST;

/*
  const result = await POST("/login",{body});
  result.data.message
  result.response.ok
*/

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