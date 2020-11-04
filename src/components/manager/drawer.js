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

/*
https://stackoverflow.com/questions/49051975/material-ui-drawer-wont-move-under-appbar
For fixing overlap of drawer and toolbar
*/
const useStyles = makeStyles({
  drawer: {


  }
});

const Drawer = props => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Theater Information",
      icon: <WebIcon />,
      onClick: () => history.push("/")
    },
    {
      text: "Showings",
      icon: <TheatersIcon />,
      onClick: () => history.push("/about")
    },
    {
      text: "Movies",
      icon: <MovieFilterIcon />,
      onClick: () => history.push("/contact")
    },
    {
      text: "Snacks",
      icon: <FastfoodIcon />,
      onClick: () => history.push("/about")
    },

  ];
  return (
    <MUIDrawer variant="temporary"  className={classes.drawer}>
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
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);
