import React             from 'react';
import MenuIcon          from '@material-ui/icons/Menu';
import Menu              from '@material-ui/core/Menu';
import MenuItem          from '@material-ui/core/MenuItem';
import { Divider }       from '@material-ui/core';
import { logoutRequest } from '../Auth/actions';
import { IconButton }    from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function MainMenu({post}) {
  const dispatch = useDispatch();
  const history  = useHistory();
  const user   = useSelector( state => state.auth.user );
  const [ element, setElement ] = React.useState(null);
  const handleClick = (event) => setElement(event.currentTarget);
  const handleClose =      () => setElement(null);
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
        <MenuItem key="edit" onClick={e=>handleClose(history.push('/profile/edit'))}>
          Settings
        </MenuItem>
        <Divider/>
        <MenuItem onClick={e => logoutRequest(dispatch)}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
