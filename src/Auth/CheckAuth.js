
import { useEffect }   from "react";
import { useSelector } from "react-redux";
import { checkAuth }   from "./actions";

const CheckAuth = () => {
  const tokens = useSelector( state => state.auth.tokens );
  useEffect( e => { if ( tokens ) { checkAuth() } } , [] );
  return null;
};

export default CheckAuth;
