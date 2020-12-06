import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Poster from "./Poster"
import Popup from "./Popup"
import UserForm from "../purchase/UserForm";

const base_url = "https://image.tmdb.org/t/p/original/";

// Passing title as props
function Row({ title, movies, isLargeRow, filters, showings}) {
  // Destructuring and hooks
  const [selected, setSelected] = useState(undefined);
  const [isViewingForm, setViewingForm] = useState(false);
  const [theaters, setTheaters] = useState([]);
  useEffect(() => {
    // When the row appears on the screen, makes a request to show the movies
    // if [] => run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get("https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters");
 
      let myTheaters = [];
      request.data.map((theater) => myTheaters.push(theater));


      setTheaters(myTheaters);
 
 
    }
    fetchData();
  }, ["https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters"]);


 

  const opts = {
    height: "390",
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // when you click on a poster
  const handleClick = (movie) => {
    console.log(movie);
    title = (movie.name? movie.name : movie.title);
    
    setSelected(() => {
      return movie
    });   

  };
// to close the popup
  const closePopup = () => {
    setSelected(undefined);
  }
 const viewForm =() => {
   setViewingForm(true);
 }
 const closeForm = () => {
   setViewingForm(false);
 }
 const passesFilter = (movie) => {
  // console.log({filters: filters, movie: movie, passesTheater: passesTheater(movie), passesLocation: passesLocation(movie)});



   if (passesTitle(movie) && passesTheater(movie) && passesLocation(movie))
    return true;
  else
    return false;

}

const passesTitle = (movie) =>{
  var filteredTitle = filters.title.toLowerCase().trim();
  var movieTitle = movie.name.toLowerCase().trim();
 
  // console.log({GivenMovie: movie.name, FilteredEntry: filters.title});
   if (filteredTitle == "")
     return true;

   else if (!movieTitle.includes(filteredTitle))
     return false;
   return true;

}
const passesTheater = (movie) =>{
  var filterTheater = filters.selectedTheater;
  var i;
  if (filterTheater == -1)
    return true;
  for (i = 0; i < showings.length; i++) {
    if (showings[i].id == filterTheater && showings[i].movie == movie.tmdbid )
      return true;
  }
  return false
}
const passesGenre = (movie) =>{
  
}

const passesLocation = (movie) =>{
  var filterLocation = filters.selectedLocation;
  // get all the theaters that have this showing
  //console.log({filterlocation: filterLocation})
  if (filterLocation == -1)
  return true;
  var myTheaters = [];
  showings.map((showing) => {if (showing.movie == movie.tmdbid)
                                    myTheaters.push(showing.id) })
                                
  // iterate over stored theaters
  var i;
  for (i = 0; i < theaters.length; i++){
    // check to make sure at least one theater w/ showings for this are at a valid location
    if (myTheaters.includes(theaters[i].id) && theaters[i].city == filterLocation)
      return true;
  }
  return false;


  
}

const filterMovie = (movie) => {
 
  //console.log(passesFilter(movie))
  if (passesFilter(movie))
    return <Poster movie= {movie} isLargeRow = {isLargeRow} baseUrl = {base_url} handleClick = {handleClick}></Poster>;
}


  return (
    
    <div className="row">
      {/* Passing Row title as text for h2 */}
      <h2>{title}</h2>
      <div className="row_posters">
        {/* several row_poster(s) */}
        {movies.map((movie) => filterMovie(movie))}
      </div>

{/*if selected is NOT undefined (there is something selected), then a popup will open */}
<Popup baseUrl= {base_url} 
selected={selected} 
open = {typeof selected != "undefined"} 
handleClose={closePopup} 
viewForm ={viewForm}
/> 

{/*will show the purchase ticket form for selected movie when button is clucked */}
{isViewingForm ? <UserForm selectedMovie={selected}/> : ""}
    </div>
  );
}

export default Row;
