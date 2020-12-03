
import clsx from 'clsx';
import React from 'react';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl    from '@material-ui/core/FormControl';
import IconButton     from '@material-ui/core/IconButton';
import Visibility     from '@material-ui/icons/Visibility';
import VisibilityOff  from '@material-ui/icons/VisibilityOff';

import { useDispatch, useSelector } from 'react-redux';
import { inputChange, toggleShowPassword } from './actions';
import styles          from './styles';
import { makeStyles }  from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

export default function PasswordField() {
  const classes  = useStyles();
  const {password,showPassword} = useSelector( ({auth:{password,showPassword}}) => ({password,showPassword}) );
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(inputChange('password',e.target.value))
  const handleClickShowPassword = () => dispatch(toggleShowPassword())
  const handleMouseDownPassword = (event) => event.preventDefault();
  return (
  <FormControl className={clsx(classes.margin, classes.textField)}>
    <InputLabel htmlFor="passwordField">Password</InputLabel>
    <Input
      name="passwordField"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={handleChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>);
}
