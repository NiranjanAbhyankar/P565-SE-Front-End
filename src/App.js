import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, AboutUs, ContactUs, ManDashboard , ShowingForm, ManSnacks} from "./views";
// import  Chat  from "./components/chat/chat"

import "./App.css";
import "./index.css";
import UserForm from "./components/purchase/UserForm";
import ChatButton from "./components/chat-button";


const App = () => {
  const { isLoading } = useAuth0();
  const [selectedMovie, setSelectedMovie] = useState("initial state");

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    //alert("UPDATED SELECTED MOVIE: CURRENTLY SELECTED MOVIE IS" + movie)
    console.log({updated:movie})

  } 

  useEffect(() => {
    console.log("SELECTED MOVIE DATA",selectedMovie);
}, [selectedMovie]);

const getMovie = () => {
  return selectedMovie;
}

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
          {console.log({fromApp: selectMovie})}
          <Route path='/home' render={(props) => (<Home {...props} selectedMovie={getMovie} selectMovieApp={selectMovie} />)}/>

          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/contact-us" exact component={ContactUs} />
          {/**THIS IS WHERE THE PROBLEM IS. PASSING IN SELECTEDMOVIE DOESNT WORK */}
          <Route path='/purchase' render={(props) => (<UserForm {...props}  selectedMovie= {selectedMovie} juicy={"BIG JUICY"} />)}/>
          <Route path="/man-dashboard" exact component={ManDashboard} />
          <Route path="/add-showings" exact component={ShowingForm} />
          <Route path="/man-snacks" exact component={ManSnacks} />
          <PrivateRoute path="/chat-button" exact component={ChatButton} />

        </Switch>
      </Container>
      {/* <Footer/> 
          <Route path="/purchase" exact component={UserFormNoProps} />

      */}
      
    </div>
  );
};

export default App;