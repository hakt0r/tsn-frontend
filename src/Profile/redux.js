
const postDefaults = {
  mine: []
};

export const postReducer = ( state=postDefaults, action )=> {
  switch ( action.type ){
    case "posts:update": return { ...state, mine: action.data };
    default: return state;
  }
}