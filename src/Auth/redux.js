
import { useSelector } from "react-redux";
import { Axios }       from "../Data/api";

const authDefaults = {
  email        : 'anx.test.user@gmail.com',
  password     : 'asdasdasdsa8',
  name         : '',
  showPassword : false,
  status       : false,
  showStatus   : false,
  user         : false,
  tokens       : false,
  register     : false 
};

export const IfAuth = ({not,children}) => {
  const auth = useSelector( state => state.auth.tokens );
  return auth ? children : null;
};

export const IfNotAuth = ({not,children}) => {
  const auth = useSelector( state => state.auth.tokens );
  return ! auth ? children : null;
};

export function authReducer( state=authDefaults, action ){
  switch ( action.type ){

    case 'auth:toggleLoginMode':
      return { ...state, register: !state.register };

    case 'auth:input:change':
      return { ...state, [action.key]: action.value };

    case 'auth:toggle:showPassword':
      return { ...state, showPassword: !state.showPassword };

    case 'auth:status:hide':
      return { ...state, showStatus: false };

    case 'auth:status:success':
      Axios.tokens = action.tokens;
      Axios.user   = action.user;
      localStorage.setItem('tsn-auth',JSON.stringify({
        user: action.user,
        tokens: action.tokens
      }));      
      return { ...state,
        user: action.user,
        tokens: action.tokens,
        status: action.status,
        showStatus: true
      };

    case "auth:recover":
      return { ...state,
        tokens: action.tokens,
        status: "Refresh Auth",
        showStatus: true
      };

    case 'auth:status:fail':
      Axios.tokens = false;
      Axios.user   = false;
      localStorage.setItem(
        'tsn-auth',
        JSON.stringify({ user: false, tokens: false }
      ));
      return { ...state,
        checkFailed: true,
        user:        false,
        tokens:      false,
        showStatus:  true,
        status:      action.status
      };

    case "auth:modify":
      return { ...state, user:{ ...state.user, ...action.modify }};
  
    case '@@INIT': return authDefaults;
    default:       return state;
  }
}