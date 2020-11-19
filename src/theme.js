
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const themeDefaults = {
  dark: false
}

export const themeReducer = ( state=themeDefaults, action ) => {
  switch ( action.type ) {
    case "theme:toggle":
      return { ...state, dark: ! state.dark };
    default: return state;
  }
}

export const themeToggle = ()=> ({type:'theme:toggle'});

const lightTheme = createMuiTheme();
const darkTheme  = createMuiTheme({
  palette: { type: "dark" }
});

export const ThemeSwitcher = ({children}) => {
  const dark = useSelector( state => state.theme.dark );
  return (
  <MuiThemeProvider theme={dark ? darkTheme : lightTheme}>
    {children}
  </MuiThemeProvider> );
}
