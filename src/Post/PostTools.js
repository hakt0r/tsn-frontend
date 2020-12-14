import React      from 'react';
import Button     from '@material-ui/core/Button';
import Menu       from '@material-ui/core/Menu';
import MenuItem   from '@material-ui/core/MenuItem';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { API } from '../Data/api';
import { Chip } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { deletePost } from '../Data/actions';

export default function PostTools({post,edit,remove}) {
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose =      () => setAnchorEl(null);
  const ownerActions = [
    <MenuItem key="edit"   onClick={ e => { handleClose(); edit() } }>Edit</MenuItem>,
    <MenuItem key="delete" onClick={ e => { handleClose(); deletePost(post.id) } }>Delete</MenuItem>
  ];
  const viewerActions = [
    <MenuItem key="report" onClick={handleClose}>Report</MenuItem>
  ];
  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <ExpandMore/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >{ post.author.id === API.user.id ? ownerActions : viewerActions }</Menu>
    </>
  );
}
