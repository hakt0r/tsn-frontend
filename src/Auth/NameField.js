
import clsx           from 'clsx';
import React          from 'react';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl    from '@material-ui/core/FormControl';
import IconButton     from '@material-ui/core/IconButton';
import AccountCircle  from '@material-ui/icons/AccountCircle';
import useStyles      from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { inputChange } from '../redux';

export default function NameField() {
  const classes = useStyles();
  const name    = useSelector( (state) => state.name );
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(inputChange('name',e.target.value))
  return (
  <FormControl className={clsx(classes.margin, classes.textField)}>
    <InputLabel htmlFor="nameField">Name</InputLabel>
    <Input
      name="nameField"
      value={name}
      onChange={handleChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton>
            <AccountCircle/>
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl> );
}
