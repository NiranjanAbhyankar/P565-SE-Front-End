import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, AboutUs, ContactUs } from "./views";
import "./App.css";
import "./index.css";
import requests from "./requests";
import Row from "./components/row/Row";
import Banner from "./components/banner/Banner";




const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <NavBar />
      <Container fluid>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/contact-us" exact component={ContactUs} />
        </Switch>
        <Banner />
        <Row title="Trending Now" fetchURL={requests.fetchTrending} isLargeRow/>
        <Row title="Family Movies" fetchURL={requests.fetchFamily} isLargeRow />
        <Row title="Top Rated" fetchURL={requests.fetchTopRated} isLargeRow/>
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies} isLargeRow/>
        <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} isLargeRow/>
        <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} isLargeRow/>
      </Container>
      <Footer />
      
    </div>
  );
};

export default App;