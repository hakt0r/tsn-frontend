import React      from 'react';
import Button     from '@material-ui/core/Button';
import Menu       from '@material-ui/core/Menu';
import MenuItem   from '@material-ui/core/MenuItem';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Avatar, Divider } from '@material-ui/core';
import { logoutRequest } from '../Auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PATCH, POST } from '../Data/api';

export default function MainMenu({post}) {
  const dispatch = useDispatch();
  const avatar = useSelector( state => state.auth.user.avatar );
  const user   = useSelector( state => state.auth.user );
  const [ element, setElement ] = React.useState(null);
  const handleClick = (event) => setElement(event.currentTarget);
  const handleClose =      () => setElement(null);
  const avatarUpload = e => {
    handleClose(e);
    const read = new FileReader();
    read.readAsDataURL(e.target.files[0]);
    read.onload = e => {
      PATCH(`user/${user.id}`,{avatar:e.target.result});
      dispatch({type:'auth:avatar',url:e.target.result});
    }
  }
  return (
    <div>
      <Avatar src={avatar} onClick={handleClick}/>
      <Menu
        anchorEl={element}
        keepMounted
        open={Boolean(element)}
        onClose={handleClose}
      >
        <MenuItem component="label">
          Avatar...
          <input type="file" hidden onChange={avatarUpload}/>
        </MenuItem>
        <MenuItem key="edit" onClick={handleClose}>Edit</MenuItem>
        <Divider/>
        <MenuItem onClick={e => logoutRequest(dispatch)}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
