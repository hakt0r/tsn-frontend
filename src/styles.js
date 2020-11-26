
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
  }
});