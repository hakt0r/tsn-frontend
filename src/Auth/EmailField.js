
import clsx           from 'clsx';
import React          from 'react';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl    from '@material-ui/core/FormControl';
import IconButton     from '@material-ui/core/IconButton';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import useStyles      from './styles';
import { inputChange } from '../redux';
import { useDispatch, useSelector } from 'react-redux';

export default function EmailField() {
  const classes  = useStyles();
  const email    = useSelector( (state) => state.email );
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(inputChange('email',e.target.value))
  return (
  <FormControl className={clsx(classes.margin, classes.textField)}>
    <InputLabel htmlFor="emailField">eMail</InputLabel>
    <Input
      name="emailField"
      value={email}
      onChange={handleChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton>
            <AlternateEmail/>
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl> );
}
