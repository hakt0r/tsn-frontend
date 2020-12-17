
export const API = {
  tokens: false
};

/*
  This setup is trying to solve 2 problems:

  I don't want to make the same request twice...
      1. ... at the same time
      2. ... or in rapid succession

  Approach:
    I create a Cache, to store the response and data
      - If I have a recent response simply return that on
      - If a equivalent request is already running,
        merge with that request 

  Solution:
    Mimic fetch and Axios, but add my own Logic -
    so from the outside it looks like using Axios or fetch.

    But internally:
      - Store the data from a recent request in a cache
      - Merge requests using Promises
  */

export class Cache {

  static byURL = {};

  static STATE_LOADING = 1;
  static STATE_READY   = 2;
  static REFRESHING    = false;

  static async fetch( uri, options={} ){

    // make sure there is options.headers, and add token if it exists
    options.headers = options.headers || {};
    if ( API.tokens ) options.headers.authorization = API.tokens.access.token;

    // deduplication:
    //  create a unique identifier like
    //  hash = '/api/user/ae46a75e47ae76f54747a7e4::{"method":"GET"}'
    //  for all requests that have the same hash (i.e. getting the same user)
    //  we want only ONE request to be made AT A TIME
    const hash = options.hash || uri + '::' + JSON.stringify(options);

    // Try to get the current state for this [hash], could be undefined
    let state = Cache.byURL[hash];

    // If it is undefined, create a new state for this [hash]
    if ( ! state ) state = Cache.byURL[hash] = {};

    if ( state.status === Cache.STATE_LOADING ){
      // The request is already being made... but there is no response yet.
      // We want to wait untilt that original request is finished and
      // then return the result of that request
      return new Promise( resolve => state.waiting.push(resolve) );

    } else if ( state.date > Date.now() - 60000 ) {
      // If we have a response to this response to this exact request
      // that is AT MOST one second old, return that resonse (cache)
      return { ...state.response, data:state.data, json: ()=> state.data };

    }

    // If we are NOT doing the request already, and we DON'T have a response
    // that is AT MOST one second old, we need to do the request

    // make other requests to the same [hash] wait for this request
    state.status = Cache.STATE_LOADING;
    
    // in this array we will collect the other waiting requests
    state.waiting = [];

    // make the actual request
    let response = await fetch( uri, options );
    let     data = await response.json();

    // if authentication fails, try to get new tokens and do the request again
    if ( response.status === 401 && API.tokens ){
      if ( await Cache.refreshTokens() ){
        options.headers.authorization = API.tokens.access.token;
        response = await fetch( uri, options );
            data = await response.json();    
      } 
    }

    // publish our response to the cache, make sure
    // no other requests line up in the [waiting]-queue
    state.date     = Date.now();
    state.response = response;
    state.data     = data;
    state.status   = Cache.STATE_READY;

    // emulates axios and fetch behaviour
    response.json  = ()=> data; // makes await response.json() work (fetch)
    response.data  = data;      // makes response.data available (axios)

    // notify the request waiting in the queue, by calling their
    // resolve function with our response object
    state.waiting.forEach( resolve => resolve(response) );

    // return the response to the "original" (first) request
    return response;
  }

  static async refreshTokens () {

    // If there's a refrsh going on already, wait in line...
    if ( Cache.REFRESHING ){
      return new Promise( resolve => Cache.REFRESHING.push(resolve) );
    }

    // Open up a queue for other requests to wait until we got our tokens or failed 
    Cache.REFRESHING = [];

    // Try to get new tokens using our refresh tokens
    const response = await fetch('/api/auth/refresh-tokens',{
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ refreshToken: API.tokens.refresh.token })
    });
    
    // If we don't get status 200 we were not successful
    if ( response.status !== 200 ){
      // Tell the others waiting for us, that it failed
      Cache.REFRESHING.forEach( resolve => resolve(false) );
      Cache.REFRESHING = false;
      // Tell redux that we don't have authentication anymore
      API.dispatch({ type: 'auth:status:fail', status: "Refresh Failed" });
      // Tell the original request that initiated the refresh that it failed as well
      return false;
    }

    // Else the refresh worked, so we get the tokens...
    const tokens = API.tokens = await response.json();
    // Tell the others waiting for us, that it worked
    Cache.REFRESHING.forEach( resolve => resolve(true) );
    Cache.REFRESHING = false;
    // Tell redux that we have new tokens
    API.dispatch({ type: 'auth:recover', tokens });
    // Tell the original request that initiated the refresh that it worked as well
    return true;
  }

  static methodic ( uri, method, body, options={} ){
    options = { ...options, method: method };
    if ( body ){
      options.headers = options.headers || {};
      options.headers['content-type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
    return Cache.fetch( uri, options );
  }

  static get( uri, body, options ) {
    return Cache.methodic( uri, 'GET', body, options );
  }

  static post( uri, body, options ) {
    return Cache.methodic( uri, 'POST', body, options );
  }

  static put( uri, body, options ) {
    return Cache.methodic( uri, 'PUT', body, options );
  }

  static patch( uri, body, options ) {
    return Cache.methodic( uri, 'PATCH', body, options );
  }

  static delete( uri, body, options ) {
    return Cache.methodic( uri, 'DELETE', body, options );
  }

}

window.API = API;

export default Cache;
