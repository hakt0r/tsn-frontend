import React      from 'react';
import Button     from '@material-ui/core/Button';
import Menu       from '@material-ui/core/Menu';
import MenuItem   from '@material-ui/core/MenuItem';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { API } from '../api';

export default function PostTools({post}) {
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose =      () => setAnchorEl(null);
  const ownerActions = [
    <MenuItem key="edit"   onClick={handleClose}>Edit</MenuItem>,
    <MenuItem key="delete" onClick={handleClose}>Delete</MenuItem>
  ];
  const viewerActions = [
    <MenuItem key="report" onClick={handleClose}>Report</MenuItem>
  ];
  return (
    <div>
      <Button onClick={handleClick}><ExpandMore/></Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >{ post.author === API.user.id ? ownerActions : viewerActions }</Menu>
    </div>
  );
}
