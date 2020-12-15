import React             from 'react';
import MenuIcon          from '@material-ui/icons/Menu';
import Menu              from '@material-ui/core/Menu';
import MenuItem          from '@material-ui/core/MenuItem';
import { Divider }       from '@material-ui/core';
import { logoutRequest } from '../Auth/actions';
import { Cache }         from '../Data/api';
import { IconButton }    from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

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
      Cache.patch(`/api/user/${user.id}`,{avatar:e.target.result});
      dispatch({type:'auth:avatar',url:e.target.result});
    }
  }
  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuIcon/>
      </IconButton>
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
