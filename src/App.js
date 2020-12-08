import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, AboutUs, ContactUs, ManDashboard , ShowingForm, ManSnacks, ManMovies} from "./views";
import Drawer from "./components/manager/man-drawer.js";
// import  Chat  from "./components/chat/chat"

import "./App.css";
import "./index.css";
import UserForm from "./components/purchase/UserForm";
import UserFormNoProps from "./components/purchase/UserFormNoProps";
import ChatButton from "./components/chat-button";



const App = () => {
  const { isLoading } = useAuth0();


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app">
      {console.log(window.location.href)}
      <NavBar /> 
      {(window.location.pathname === "/man-dashboard" || window.location.pathname === "/man-snacks" || window.location.pathname === "/add-showings"
       || window.location.pathname === "/man-dashboard")
      && 
      <Drawer />
      //only show this sidebar with manager dashboard
      }
      <div className="sideOpen">
      <Container fluid>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/contact-us" exact component={ContactUs} />
          <Route path="/purchase" exact component={UserFormNoProps} />
          <Route path="/man-dashboard" exact component={ManDashboard} />
          <Route path="/add-showings" exact component={ShowingForm} />
          <Route path="/man-snacks" exact component={ManSnacks} />
          <Route path="/man-movies" exact component={ManMovies} />
          <PrivateRoute path="/chat-button" exact component={ChatButton} />

        </Switch>
      </Container>
      {/* <Footer/> */}
      </div>
    </div>
  );
};

export default App;