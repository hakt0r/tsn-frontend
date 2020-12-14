
import React          from 'react';
import Menu           from '@material-ui/core/Menu';
import MenuItem       from '@material-ui/core/MenuItem';
import ExpandMore     from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';

export default function UserTools({edit}) {
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose =      () => setAnchorEl(null);
  return <>
  <IconButton size="small" onClick={handleClick}>
    <ExpandMore/>
  </IconButton>
  <Menu
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem key="edit"   onClick={ e => { handleClose(); edit() } }>Edit</MenuItem>
    <MenuItem key="delete" onClick={handleClose}>Delete</MenuItem>
  </Menu></>;
}
