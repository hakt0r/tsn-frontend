import { fade } from "@material-ui/core";

export default (theme) => ({
  root: {
    backgroundColor: fade(theme.palette.background.paper,0.3),
    width: "fit-content",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    "+ button":{
      marginTop: theme.spacing(1)
    }
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    minWidth: '25ch',
    maxWidth: '35ch'
  },
  button: {
    margin: theme.spacing(1),
  },
});
