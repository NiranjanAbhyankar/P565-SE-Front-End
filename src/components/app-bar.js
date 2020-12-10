import React, { useState, useEffect} from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";

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



const  MAppBar = props =>{
    const { history } = props;
    const { isAuthenticated, loginWithRedirect, logout,  user, getAccessTokenSilently, getAccessTokenWithPopup } =useAuth0();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [values, setValues] = useState({
      isManager: false
    });
    useEffect(() => {
      if(isAuthenticated){
        async function isManager(){
          const accessToken = await getAccessTokenSilently({
            audience: "MainAPI",
            scope: ""
          });
          let request = await axios({
              url: 'https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/isManager',
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + accessToken
              }
          });
          let x = request.data === 'True';
          setValues({isManager: x})
        };
        isManager();
      }
    }, ["https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/isManager"]);

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

    function handleClick (event) {
        setAnchorEl(event.currentTarget);
    };


    const handleClose =  pageURL => {
        setAnchorEl(null);
        history.push(pageURL)

    };
    const handleCloseMenu =(event) =>{
      setAnchorEl(null);

  };

    let menuItems;
    if(values.isManager){
      menuItems = <div>
      <MenuItem onClick={() => handleClose("profile")}>Profile</MenuItem>
      <MenuItem onClick={() => handleClose("/man-dashboard")}>Theaters</MenuItem>
      <MenuItem onClick={() => handleClose("/man-movies")}>Add Movies</MenuItem>
      <MenuItem onClick={() => handleClose("/add-showings")}>Add Showings</MenuItem>
      <MenuItem onClick={() => handleClose("/man-snacks")}>Snacks</MenuItem>
      <MenuItem onClick={() => handleClose("/orders")}>Orders</MenuItem>
      <MenuItem onClick={() => handleClose("./chat-button")}>Chat</MenuItem>
      </div>;
    }
    else{
      menuItems = <div>
      <MenuItem onClick={() => handleClose("/profile")}>Profile</MenuItem>
      <MenuItem onClick={() => handleClose("/home")}>Browse</MenuItem>
      <MenuItem onClick={() => handleClose("/my-orders")}>Orders</MenuItem>
      <MenuItem onClick={() => handleClose("./chat-button")}>Chat</MenuItem>
      </div>;
    }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {menuItems}
            </Menu>
          <Typography variant="h6" className={classes.title}>
          <a href = "/home">
            <img className = {classes.height} src={window.location.origin + '/NavLogoWhite.png'} />
            </a>
          </Typography>
          
          <Button color="inherit" onClick={logInOut}>{isAuthenticated ? "Logout" : "Login"}</Button>
          {isAuthenticated? 
          <IconButton  className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </IconButton> : <div></div>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(MAppBar);