import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import WebIcon from '@material-ui/icons/Web';
import TheatersIcon from '@material-ui/icons/Theaters';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { withRouter } from "react-router-dom";
import Divider from '@material-ui/core/Divider';


import { NavLink as RouterNavLink } from "react-router-dom";

import { Container, Nav, Navbar } from "react-bootstrap";


/*
<Nav.Link
      as={RouterNavLink}
      to="/profile"
      exact
      activeClassName="router-link-exact-active"
    >
      Profile
    </Nav.Link>
*/
/*
https://stackoverflow.com/questions/49051975/material-ui-drawer-wont-move-under-appbar
For fixing overlap of drawer and toolbar
*/
const useStyles = makeStyles((theme) => ({
  drawer: {


  },

  toolbar: theme.mixins.toolbar

}));

const Drawer = props => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Theater Information",
      icon: <WebIcon />,
      onClick: () => history.push("/man-dashboard")
    },
    {
      text: "Add Showing",
      icon: <TheatersIcon />,
      onClick: () => history.push("/add-showings")
    },
    {
      text: "Add Movie",
      icon: <MovieFilterIcon />,
      onClick: () => history.push("/man-movies")
    },
    {
      text: "Snacks",
      icon: <FastfoodIcon />,
      onClick: () => history.push("/man-snacks")
    },

  ];
  return (
    <MUIDrawer variant="permanent"  className={classes.drawer}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>

          );
        })}
        <ListItem>
        <Nav.Link
      as={RouterNavLink}
      to="/profile"
      exact
      activeClassName="router-link-exact-active"
    >
      Profile
    </Nav.Link>
    </ListItem>
      </List>
    </MUIDrawer>
    
  );
};

export default withRouter(Drawer);
