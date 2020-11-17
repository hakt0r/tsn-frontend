
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles( (theme) => ({
  root: {
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
    width: '25ch',
  },
  button: {
    margin: theme.spacing(1),
  },
}));
