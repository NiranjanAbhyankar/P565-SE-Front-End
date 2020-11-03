import React, { useState, useEffect} from "react";
import axios from 'axios';
import Poster from "./PosterCustom.js";


function Showings() {
    const fetchURL = "http://silo.soic.indiana.edu:29102/api/movies";
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    //const url = "https://api.themoviedb.org/3/search/movie?api_key=d73ffca3a2d08b6870b16763c14c058b";
    const [state, setState] = useState({
        s: "",
        movies: [],
        selected: undefined})
/*
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

*/
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            console.log(request.data);
            setState(prevState =>{
                console.log(request.data[0].posterurl)
                return {...prevState, movies:request.data}
              })
            // return request;
          }
        fetchData();
    }, [fetchURL]);
    
    const handleClick = (movie) => {
        
        console.log(movie);
        //title = (movie.name? movie.name : movie.title);
        
        setState(prevState =>{
          return {...prevState, selected:movie}
        })
      };

      
    return (
        <div>
            <div className="row_posters">
        
        {state.movies.map((movie) => (
            <Poster movie= {movie} isLargeRow = {true} baseUrl = {baseUrl} handleClick = {handleClick}></Poster>
          ))}
        </div>
        </div>
    )
}

export default Showings
/*
<div className="row_posters">
        
        {state.movies.map((movie) => (
            <Poster movie= {movie} isLargeRow = {true} baseUrl = {baseUrl} handleClick = {handleClick}></Poster>
          ))}
        </div>
*/