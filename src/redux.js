
import { authReducer }  from "./Auth/redux";
import { themeReducer } from "./theme";
import { cacheReducer } from "./Data/redux";

const { createStore, combineReducers } = require("redux");

export const store = createStore(
  combineReducers({
    auth:authReducer,
    cache:cacheReducer,
    theme:themeReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);