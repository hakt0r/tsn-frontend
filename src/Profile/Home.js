
import React, { useEffect }         from 'react';
import Paper                        from '@material-ui/core/Paper';
import { POST, GET }                from '../Data/api';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Posts from '../Post/Posts';

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
    position: 'sticky',
    top:0
  }
}));

export default function Home() {
  return <Posts/>;
}
