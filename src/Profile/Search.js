
import { fade, InputBase, makeStyles } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { useSelector  } from "react-redux";
import { useHistory   } from "react-router-dom";
import { search       } from "./actions";

const useStyles = makeStyles( theme => ({
  search: {
    marginRight: theme.spacing(1),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    height: '100%',
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
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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
    id="search-autocomplete-combo"
    options={ list || []}
    getOptionLabel={ o => o.name }
    onInputChange={change}
    onChange={select}
    debug={true}
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