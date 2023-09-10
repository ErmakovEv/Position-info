import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

function MainNavigation() {
  return (
    <Box className="header">
      <AppBar>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <NavLink to="/">
            <IconButton size="large" edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
          </NavLink>
          <IconButton size="large" color="inherit">
            <LocationOnIcon />
          </IconButton>
          <NavLink to="/auth">
            <IconButton size="large" edge="end" color="inherit">
              <LogoutIcon />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainNavigation;
