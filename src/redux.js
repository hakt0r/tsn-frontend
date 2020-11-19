
import { authReducer }  from "./Auth/redux";
import { postReducer }  from "./Profile/redux";
import { themeReducer } from "./theme";

const { createStore, combineReducers } = require("redux");

export const store = createStore(
  combineReducers({
    auth:authReducer,
    post:postReducer,
    theme:themeReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);