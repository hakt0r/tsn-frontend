
/*
  const result = await POST("/login",{body});
  result.data.message
  result.response.ok
*/
export function POST ( uri, body ) {
  const headers = {};
  if ( POST.tokens ) headers['Authorization'] = POST.tokens.access.token;
  return fetch( `/api/${uri}`, {
    method: "POST",
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then( response => { // >>>>>>>>>>
    return response.json() //      v
    // recieve json  vvvv          v
    .then( function (data) { //    v
      //       vvvv--^^^^          v
      return { data, response } // v
    });//            ^^^^^^^^<<<<<<<
    // modify response into an object
    //   containing data and response
  })
  // .then ( obj )
  //         obj = {
  //          data : { message : ... }
  //          response : { status: 200, ... }
  //         }
}
