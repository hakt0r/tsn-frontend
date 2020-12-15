
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
    alignItems: 'center',
    borderBottom: `solid 1px ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    background: `linear-gradient(180deg, transparent 96%, ${theme.palette.divider} 100%)`,
  }
});