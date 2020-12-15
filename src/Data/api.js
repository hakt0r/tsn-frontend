
export const API = {
  tokens: false
};

export class Cache {

  static byURL = {}

  static STATE_LOADING = 1;
  static STATE_READY   = 2;
  static REFRESHING    = false;

  static async fetch(uri,options){
    options         = options || {};
    options.headers = options.headers || {};
    if ( API.tokens ) options.headers.authorization = API.tokens.access.token;
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
      let response, data;
      response = await fetch( uri, options );
          data = await response.json();
      if ( response.status === 401 && API.tokens ){
        if ( await Cache.refreshTokens() ){
          options.headers.authorization = API.tokens.access.token;
          response = await fetch( uri, options );
              data = await response.json();         
        } 
      }
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

  static async refreshTokens () {
    if ( Cache.REFRESHING ){
      return new Promise( resolve => Cache.REFRESHING.push(resolve) );
    } else {
      Cache.REFRESHING = [];
      const response = await fetch('/api/auth/refresh-tokens',{
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          refreshToken: API.tokens.refresh.token
        })
      });
      if ( response.status !== 200 ){
        Cache.REFRESHING.forEach( resolve => resolve(false) );
        Cache.REFRESHING = false;
        API.dispatch({ type: 'auth:status:fail', status: "Refresh Failed" });
        return false;
      }
      const tokens = await response.json();
      API.tokens = tokens;
      Cache.REFRESHING.forEach( resolve => resolve(true) );
      Cache.REFRESHING = false;
      API.dispatch({ type: 'auth:recover', tokens });
      return true;
    }
  }

  static methodic ( uri, method, body, options={} ){
    options = { ...options, method: method };
    options.headers = options.headers || {};
    options.headers['content-type'] = 'application/json';
    options.body = JSON.stringify(body);
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
