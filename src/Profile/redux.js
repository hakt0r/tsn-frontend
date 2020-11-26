
const postDefaults = {
  mine: [],
  search: {}
};

export const postReducer = ( state=postDefaults, action )=> {
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
      return { ...state, mine: data };
    default: return state;
  }
}