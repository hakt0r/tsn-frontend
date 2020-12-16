
const cacheDefaults = {
  user:         {},
  post:         {},
  postsFor:     {},
  postsOnlyFor: {},
  group:        {},
  search:       {}
};
export const cacheReducer = ( state=cacheDefaults, action )=> {
  const { userId, user, users, post, posts, list, model, field, match } = action;
  let updated, have, more;
  switch ( action.type ){

    case "user":
      return { ...state, user:{ ...state.user, [user.id]: user } };
    
    case "users":
      updated = { ...state.user };
      users.forEach( user => updated[user.id] = users )
      return { ...state, user:updated };

    case "post":
      return { ...state, post:{ ...state.post, [action.post.id]: post } };
    
    case "posts":
      updated = { ...state.post };
      posts.forEach( post => updated[post.id] = posts );
      return { ...state, post:updated };

    case "user:posts:reset":
      return { ...state, postsFor: { ...state.postsFor, [userId]: [] } };

    case "user:posts":
      have = state.postsFor[userId];
      more = ! state.postsFor[userId] ? posts : have.concat(posts);
      return { ...state, postsFor: { ...state.postsFor, [userId]: more } };

    case "user:posts:only:reset":
      return { ...state, postsOnlyFor: { ...state.postsOnlyFor, [userId]: [] } };

    case "user:posts:only":
      have = state.postsOnlyFor[userId];
      more = ! state.postsOnlyFor[userId] ? posts : have.concat(posts);
      return { ...state, postsOnlyFor: { ...state.postsOnlyFor, [userId]: more } };
  
    case "search:results":
      return { ...state, search:{ list, model, field, match } };

    default: return state;

  }
}