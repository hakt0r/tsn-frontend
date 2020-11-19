
import React, { useEffect }         from 'react';
import Paper                        from '@material-ui/core/Paper';
import { POST, GET }                from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Avatar, makeStyles } from '@material-ui/core';

const post = dispatch => e => (
  POST('post/',{
    message:"hello!"
  })
  .then( ({response}) => console.log( response.ok ? 'success' : 'fail') )
)

const getPosts = dispatch => (
  GET('post/')
  .then( ({data}) => dispatch({type:'posts:update',data}) )
);

const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
}));

export default function InputWithIcon() {
  const classes = useStyles();
  const auth     = useSelector( state => state.auth );
  const { mine } = useSelector( state => state.post );
  const dispatch = useDispatch();
  useEffect(
    $=> { if (auth.tokens) getPosts(dispatch) }
  ,[auth]);
  return <>
  <AppBar className={classes.root}>
    <Avatar/>{auth.user.name}
  </AppBar>
  { mine && ! mine.code ?
  <Paper>
    {mine.map((post,idx)=><p key={idx}>{post.message}</p>)}
  </Paper> : null }</>;
}
