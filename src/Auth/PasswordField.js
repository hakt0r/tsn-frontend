
import clsx from 'clsx';
import React from 'react';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl    from '@material-ui/core/FormControl';
import IconButton     from '@material-ui/core/IconButton';
import Visibility     from '@material-ui/icons/Visibility';
import VisibilityOff  from '@material-ui/icons/VisibilityOff';

import useStyles      from './styles';

export default function PasswordField({values,setValues}) {
  const classes = useStyles();
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleChange = (e) => setValues({ ...values, password: e.target.value });
  return (
  <FormControl className={clsx(classes.margin, classes.textField)}>
    <InputLabel htmlFor="passwordField">Password</InputLabel>
    <Input
      name="passwordField"
      type={values.showPassword ? 'text' : 'password'}
      value={values.password}
      onChange={handleChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>);
}
