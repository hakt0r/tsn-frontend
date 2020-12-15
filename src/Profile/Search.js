
import { fade, InputBase, makeStyles } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { useSelector  } from "react-redux";
import { useHistory   } from "react-router-dom";
import { search       } from "./actions";

const useStyles = makeStyles( theme => ({
  search: {
    marginRight: 0,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    height: '100%',
    "^:focus-within":{
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0,2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    height: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: 0,
    "&:focus": {
      width: '15ch'
    },
    [theme.breakpoints.up('md')]: {
      width: '10ch',
    }
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { list } = useSelector( state => state.cache.search );
  const change = e => search(e.target.value)
  const select = (e,v,r) => {
    if ( r === 'select-option' ) history.push(`/user/${v.id}`);
  };
  return (
  <Autocomplete
    freeSolo
    clearOnBlur={true}
    blurOnSelect={true}
    options={ list || []}
    getOptionLabel={ o => o.name }
    onInputChange={change}
    onChange={select}
    onClose={e=>search('')}
    renderInput={(params) => (
      <div className={classes.search} ref={params.InputProps.ref}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          {...params.inputProps}
          />
      </div>
  )}/> );
}