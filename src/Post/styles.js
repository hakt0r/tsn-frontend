
import { makeStyles, fade } from "@material-ui/core";

export default makeStyles( theme => ({
  postEdge: {
    position:'absolute',
    width: theme.spacing(1),
    height: '100%',
    top:0, left:0,
    backgroundColor: fade(theme.palette.primary.light,0.2),
  },
  postBody: {
    padding:theme.spacing(2),
    paddingLeft:theme.spacing(3),
  },
  post: {
    "&.comment": {
      "&.first": {
        borderTop:`solid 1px ${theme.palette.divider}`
      },
      margin: 0,
      borderRadius: 0,
      background:'none',
    },
    overflow: 'hidden',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderBottom: `${fade(theme.palette.primary.light,0.2)} solid 1px`,
    marginTop: theme.spacing(1),
    position:'relative',
    borderBottom: `solid 1px ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    background: `linear-gradient(180deg, transparent 96%, ${theme.palette.divider} 100%)`,
    "& a:visited": {
      color: 'white'
    },
    "& a:hover": {
      color: 'white'
    }
  },
  microLinks:{
    fontSize: 10,
    clear: 'both',
    opacity: 0.8,
    "& > *":{
      fontSize: 10,
    },
    "& > a":{
      cursor: 'pointer',
      color: theme.palette.primary.light
    }
  }
}));