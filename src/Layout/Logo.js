
import rindr from '../rindr.svg';

export default function Logo () { return (
  <img alt="" src={rindr} style={{
    position: "fixed",
    top:"10vh",
    left:'50%',
    width:'70vw',
    zIndex:-1,
    transform:'translate(-50%)',
    objectFit:'cover',
    filter: 'drop-shadow(#000000cc 2px 2px 3px)'
  }}/>
)}