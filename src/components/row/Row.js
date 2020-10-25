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
function Row({ title, fetchURL, isLargeRow }) {
  // Destructuring and hooks
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [isViewingForm, setViewingForm] = useState(false);

  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which rans based on a specific condition/variable
  useEffect(() => {
    // When the row appears on the screen, makes a request to show the movies
    // if [] => run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(fetchURL);
      // "https://api.themoviedb.org/3/discover/tv?api-key=${API_KEY}&with_networks=213"
      setMovies(request.data.results);
      // return request;
    }
    fetchData();
    // Any variable pulled outsited of useEffect scope has to go inside the [] at the end of the method
  }, [fetchURL]);

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
   // alert(title);

 
    /*if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
    */
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

  return (
    
    <div className="row">
      {/* Passing Row title as text for h2 */}
      <h2>{title}</h2>
      <div className="row_posters">
        {/* several row_poster(s) */}
        {movies.map((movie) => (
         <Poster movie= {movie} isLargeRow = {isLargeRow} baseUrl = {base_url} handleClick = {handleClick}></Poster>
        ))}
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
