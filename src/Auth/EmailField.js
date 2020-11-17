
import clsx           from 'clsx';
import React          from 'react';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl    from '@material-ui/core/FormControl';
import IconButton     from '@material-ui/core/IconButton';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import useStyles      from './styles';

export default function EmailField({values,setValues}) {
  const classes = useStyles();
  const handleChange = (e) => setValues({ ...values, email: e.target.value });
  return (
  <FormControl className={clsx(classes.margin, classes.textField)}>
    <InputLabel htmlFor="emailField">eMail</InputLabel>
    <Input
      name="emailField"
      value={values.email}
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
