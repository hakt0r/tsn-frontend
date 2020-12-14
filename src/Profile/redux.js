
const postDefaults = {
  posts:  {},
  search: {}
};

export const cacheReducer = ( state=postDefaults, action )=> {
  const { id, data, list, model, field, match } = action;
  switch ( action.type ){
    case "user:profile":
      return { ...state, profiles: { ...state.profiles, [id]: data }}
    case "search:change":
      return { ...state, search:{ model, field, match } };
    case "search:results":
      return { ...state, search:{ list, model, field, match } };
    case "auth:avatar":
      return { ...state, avatar:action.url }
    case "posts:update":
      return { ...state, posts: { ...state.posts,
        [action.userId]: action.posts
      }};
    case "posts:update:one":
      const current = state.posts[action.userId];
      return { ...state,
        posts: { ...state.posts,
          [action.userId]: current.map( post => post.id === action.data.id ? action.data : post )
        }
      };
    default: return state;
  }
}