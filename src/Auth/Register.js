
import React          from 'react';
import Paper          from '@material-ui/core/Paper';

import useStyles      from './styles';
import PasswordField  from './PasswordField';
import EmailField     from './EmailField';
import NameField      from './NameField';
import LoginButton    from './LoginButton';
import StatusSnackbar from './StatusSnackbar';
import { POST } from '../api';

async function requestLogin(values,setValues){
  const { email, name, password } = values;
  const { data, response } = await POST(
    `auth/register`,
    { email, name, password }
  );
  if ( response.ok ){
    setValues({
      ...values,
      showStatus: true,
      status: { message : 'Success' }
    });
  } else {
    setValues({
      ...values,
      showStatus: true,
      status: { message : data.message, code : response.status }
    });
  }
}

const defaults = {
  email        : 'Test123@gmail.com',
  name         : 'Test123',
  password     : 'asdasdasdsa8',
  showPassword : false,
  showStatus   : false,
  status       : false
};

export default function Register() {
  const classes = useStyles();
  const [ values, setValues ] = React.useState(defaults);
  const submit = e => {
    e.preventDefault();
    requestLogin(values,setValues);
  }
  return ( <>
  <StatusSnackbar {...{values,setValues}}/>
  <Paper className={classes.root}>
    <div><EmailField    {...{values,setValues}}/></div>
    <div><NameField     {...{values,setValues}}/></div>
    <div><PasswordField {...{values,setValues}}/></div>
    <div><LoginButton   onClick={submit} text="Register"/></div>
  </Paper></> );
}
