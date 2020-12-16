
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
  let updated;
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

    case "user:posts":
      const have = state.postsFor[userId];
      const more = ! state.postsFor[userId] ? posts : have.concat(posts);
      return { ...state, postsFor: { ...state.postsFor, [userId]: more } };

    case "user:posts:only":
      return { ...state, postsOnlyFor: { ...state.postsOnlyFor, [userId]: posts } };

    case "search:results":
      return { ...state, search:{ list, model, field, match } };

    default: return state;

  }
}