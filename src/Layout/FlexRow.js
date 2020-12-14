
const FlexRow = ({children,className}) => {
  return <div
    className={className}
    style={{display:"flex",flexFlow:'row'}}
  >{children}</div>;
}

export default FlexRow;
