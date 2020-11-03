import React from "react";
import { Container, Row } from "react-bootstrap";
import AddShowing from "../components/manager/AddShowing";
import Theater_Info from "../components/manager/Theater-info";
import AddMovie from "../components/manager/addMovie";
import AddSnack from "../components/manager/addSnack";
import Showing from "../components/manager/showings.js";



import { Route, Switch } from "react-router-dom";
import Drawer from '../components/manager/drawer';


import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    zIndex: -1000,
  }
});


const ManDashboard = () => {
  const classes = useStyles();
    return (

  <div>
          <Theater_Info/>
          <hr/>
          <Showing/>
          <hr/>
          <AddShowing/>
          <hr/>
          <AddSnack/>
          <hr/>
          <AddMovie/>
          </div>

          

        
      );
    };

export default ManDashboard;
/*

        <div className={classes.container}>
        <Drawer />
        <Switch>
          <Route exact from="/add-showing" render={props => <AddShowing {...props} />} />
          <Route exact path="/theater-info" render={props => <Theater_Info {...props} />} />
          <Route exact path="/add-snack" render={props => <AddSnack {...props} />} />
        </Switch>
      </div>
          */
