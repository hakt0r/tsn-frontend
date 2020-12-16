
export const paperTheme = theme => ({
  root: {
    padding: theme.spacing(1),
    margin:  theme.spacing(1),
    "&> div": {
      marginTop: theme.spacing(1)
    },
    "&> div:first-of-type": {
      marginTop: 0
    }
  },
  large: {
    width: 50,
    height: 50
  },
  row: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
    paddingTop:    theme.spacing(0.5),
    alignItems: 'center',
    borderBottom: `solid 1px ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    background: `
    linear-gradient(0deg,   ${theme.palette.divider}      0px, transparent 4px),
    linear-gradient(-90deg, ${theme.palette.divider}      0px, transparent 4px)
    `,
    '&.incoming':{
      background: `
      linear-gradient(0deg,   ${theme.palette.divider}      0px, transparent 4px),
      linear-gradient(-90deg, ${theme.palette.divider}      0px, transparent 4px),
      linear-gradient(90deg,  ${theme.palette.warning.dark} 0px, transparent 4px)
    `},
    '&.outgoing':{
      background: `
      linear-gradient(0deg,   ${theme.palette.divider}      0px, transparent 4px),
      linear-gradient(-90deg, ${theme.palette.divider}      0px, transparent 4px),
      linear-gradient(90deg,  ${theme.palette.info.dark} 0px, transparent 4px)
    `}
  }
});