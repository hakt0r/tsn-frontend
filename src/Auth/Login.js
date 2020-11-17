
import React          from 'react';

import Paper          from '@material-ui/core/Paper';

import useStyles      from './styles';
import PasswordField  from './PasswordField';
import EmailField     from './EmailField';
import LoginButton    from './LoginButton';
import StatusSnackbar from './StatusSnackbar';

import { POST }       from '../api';

function requestLogin(values,setValues){
  const { email, password } = values;

  POST( 'auth/login', { email, password } )
  .then(
    ({ data, response }) => {
      if ( response.ok ){
        setValues({
          ...values,
          showStatus: true,
          status: { message : 'Success' }
        })
      } else {
        setValues({
          ...values,
          showStatus: true,
          status: { message : data.message, code : response.status }
        })
      }
    }
  );

}

const defaults = {
  email        : 'Test123@gmail.com',
  password     : 'asdasdasdsa8',
  showPassword : false,
  status       : false,
  showStatus   : false
};

export default function InputWithIcon() {
  const classes = useStyles();
  const [ values, setValues ] = React.useState(defaults);
  const submit = e => {
    e.preventDefault();
    requestLogin(values,setValues);
  }
  return ( <>
  <StatusSnackbar values={values} setValues={setValues}/>
  <Paper className={classes.root}>
    <div><EmailField    values={values} setValues={setValues}/></div>
    <div><PasswordField values={values} setValues={setValues}/></div>
    <div><LoginButton   onClick={submit} text="Login"/></div>
  </Paper></> );
}
