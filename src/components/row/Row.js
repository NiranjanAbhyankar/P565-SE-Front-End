import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import Poster from "./Poster"
import MoviePopup from "./MoviePopup"
import TimesPopup from "../movieTimes/TimesPopup";

const base_url = "https://image.tmdb.org/t/p/original/";

// Passing title as props
function Row({ title, fetchURL, isLargeRow }) {
  // Destructuring and hooks
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [viewingTimes, setViewingTimes] = useState(false);

  const [myData , setData] = useState([]);

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
  const handleClickMovie = (movie) => {
    console.log(movie);
    title = (movie.name? movie.name : movie.title);
    
    // sets the selected hook state to the clicked movie
    setSelected(() => {
      return movie
    });   
   // alert(title);
  };

// to close the popup, remove the currently selected movie
  const closeMoviePopup = () => {
    setSelected(undefined);
  }


  //view movie times popup
  const handleViewTimes = () => {
    setViewingTimes(true);
    getTheatersFromApi();

    console.log("SHOW MOVIE TIMES FOR " + selected.name)
  }

  const handleCloseTimes = ()=> {
    setViewingTimes(false);
  }

  
  async function getTheatersFromApi() {
    const url = "http://silo.soic.indiana.edu:29102/api/theaters";
    fetch(url)
        .then(response => response.json())
        .then(data => setData(data));
        const PostData = getTheatersFromApi();
        console.log(myData);
  }

  // what gets rendered
  return (
    <div className="row">
      {/* Passing Row title as text for h2 */}
      <h2>{title}</h2>
      <div className="row_posters">
        {/* several row_poster(s) */}
        {movies.map((movie) => (
         <Poster movie= {movie} isLargeRow = {isLargeRow} baseUrl = {base_url} handleClick = {handleClickMovie}></Poster>
        ))}
      </div>
     
{/*if selected is NOT undefined (there is something selected), then a popup will open */}
<MoviePopup handleViewTimes = {() => handleViewTimes()} baseUrl= {base_url} selected={selected} open = {typeof selected != "undefined"} handleClose={closeMoviePopup} /> 

    </div>
  );
}

export default Row;
