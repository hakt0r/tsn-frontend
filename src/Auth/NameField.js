
import clsx           from 'clsx';
import React          from 'react';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl    from '@material-ui/core/FormControl';
import IconButton     from '@material-ui/core/IconButton';
import AccountCircle  from '@material-ui/icons/AccountCircle';
import useStyles      from './styles';

export default function NameField({values,setValues}) {
  const classes = useStyles();
  const handleChange = (e) => setValues({ ...values, name: e.target.value });
  return (
  <FormControl className={clsx(classes.margin, classes.textField)}>
    <InputLabel htmlFor="nameField">Name</InputLabel>
    <Input
      name="nameField"
      value={values.name}
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
