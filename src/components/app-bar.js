import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  height: {
      height:30,
  },
}));



export default function MAppBar() {
    const { isAuthenticated, loginWithRedirect, logout } =useAuth0();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const logInOut = (event) => {
        if (isAuthenticated){
            logout({
                returnTo: window.location.origin,
              });
        }
        else{
            loginWithRedirect();
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          <Typography variant="h6" className={classes.title}>
          <a href = "/home">
            <img className = {classes.height} src={window.location.origin + '/NavLogoWhite.png'} />
            </a>
          </Typography>
          
          <Button color="inherit" onClick={logInOut}>{isAuthenticated ? "Logout" : "Login"}</Button>
          <IconButton  className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}