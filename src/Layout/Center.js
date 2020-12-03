
export default function Center({children}){
  return <div
    style={{
      position:"fixed",
      width:"fit-content",
      height:"fit-content",
      bottom:"10%",
      left:"50%",
      transform:"translate(-50%, 0%)"
    }}
  >{children}</div>;
}