
export const postTheme = theme => ({
  root: {
    padding: theme.spacing(1),
    margin:  theme.spacing(1),
    "&> div": {
      marginTop: theme.spacing(1)
    },
    "&> div:first-of-type": {
      marginTop: 0
    }
  }
});