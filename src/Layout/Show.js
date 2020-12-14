
export default function Show ({when,children}){
  return when ? children : null;
}