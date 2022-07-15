import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export const AppHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink activeClassName="active-nav" exact to="/">
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <WbSunnyIcon />
          </IconButton>
        </NavLink>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          My weather
        </Typography>
        <NavLink activeClassName="active-nav" exact to="/">
          <Button color="inherit">Home</Button>
        </NavLink>
        <NavLink activeClassName="active-nav" exact to="/favorites">
          <Button color="inherit">Favorites</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};
