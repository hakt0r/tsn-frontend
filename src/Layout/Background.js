
import bg from '../bg.jpg';

export default function Background () { return (
  <img alt="" src={bg} style={{
    position: "fixed",
    top:0,
    left:0,
    width:'100vw',
    height:'100vh',
    zIndex:-1,
    filter:"blur(3px) grayscale(0.8)",
    opacity:0.025,
    objectFit:'cover'
  }}/>
)}