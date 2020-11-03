import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, AboutUs, ContactUs, ManDashboard } from "./views";
import "./App.css";
import "./index.css";



const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app">
      {console.log(window.location.href)}
      <NavBar /> 
      <Container fluid>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/contact-us" exact component={ContactUs} />
          <Route path="/man-dashboard" exact component={ManDashboard} />
        </Switch>
      </Container>
      <Footer />
      
    </div>
  );
};

export default App;