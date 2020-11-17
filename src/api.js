
export function POST (uri,body) {
  return fetch( `/api/${uri}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then( response => {
    return response.json()
    .then( data => ({ data, response }) )
  })
}
