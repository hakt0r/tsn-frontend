
const FlexRow = ({children,style={},className}) => {
  return <div
    className={className}
    style={{display:"flex",flexFlow:'row',...style}}
  >{children}</div>;
}

export default FlexRow;
