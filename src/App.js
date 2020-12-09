import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading, PrivateRoute} from "./components";
import MAppBar from "./components/app-bar.js";
import axios from "axios";
import { Home, Profile, AboutUs, ContactUs, ManDashboard , ShowingForm, ManSnacks, ManMovies, AboutMovie} from "./views";
import Drawer from "./components/manager/man-drawer.js";
// import  Chat  from "./components/chat/chat"

import "./App.css";
import "./index.css";
import UserForm from "./components/purchase/UserForm";
import ChatButton from "./components/chat-button";


const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const [selectedMovie, setSelectedMovie] = useState("initial state");


  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    //alert("UPDATED SELECTED MOVIE: CURRENTLY SELECTED MOVIE IS" + movie)
    console.log({updated:movie})

  } 
  async function isManager(){
    axios("https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/isManager").then((request)=>{
        return request.data;
    })
  };


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
      <MAppBar /> 
      <Container fluid>
        <Switch>
          <Route path="/" exact component={Home} >
            {/*isManager?<Redirect to="/man-dashboard" /> : <p></p> */ }
          </Route>
          {console.log({fromApp: selectMovie})}
          <Route path='/home' render={(props) => (<Home {...props} selectedMovie={getMovie} selectMovieApp={selectMovie} />)}>
            {/*isManager ?<Redirect to="/man-dashboard" /> : <p></p> */ }
          </Route>

          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/contact-us" exact component={ContactUs} />
          {/**THIS IS WHERE THE PROBLEM IS. PASSING IN SELECTEDMOVIE DOESNT WORK */}
          <Route path='/purchase' render={(props) => (<UserForm {...props}  selectedMovie= {selectedMovie} juicy={"BIG JUICY"} />)}/>
          <Route path="/man-dashboard" exact component={ManDashboard} />
          <Route path="/add-showings" exact component={ShowingForm} />
          <Route path="/man-snacks" exact component={ManSnacks} />
          <Route path="/man-movies" exact component={ManMovies} />
          <Route path="/about-movie" exact component={AboutMovie} />
          <PrivateRoute path="/chat-button" exact component={ChatButton} />

        </Switch>
      </Container>
    </div>
  );
};

export default App;
