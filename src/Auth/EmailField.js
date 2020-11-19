
import clsx            from 'clsx';
import React           from 'react';
import Input           from '@material-ui/core/Input';
import InputLabel      from '@material-ui/core/InputLabel';
import InputAdornment  from '@material-ui/core/InputAdornment';
import FormControl     from '@material-ui/core/FormControl';
import IconButton      from '@material-ui/core/IconButton';
import AlternateEmail  from '@material-ui/icons/AlternateEmail';
import { inputChange } from './redux';
import { useDispatch, useSelector } from 'react-redux';

import styles          from './styles';
import { makeStyles }  from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

export default function EmailField() {
  const classes  = useStyles();
  const email    = useSelector( (state) => state.auth.email );
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
