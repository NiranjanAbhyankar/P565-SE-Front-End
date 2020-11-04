import React, { useState, useEffect} from "react";
import axios from 'axios';
import Poster from "./PosterCustom.js";
import Popup from './Popup.js';


function Showings({createShowing}) {
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/movies";
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    //const url = "https://api.themoviedb.org/3/search/movie?api_key=d73ffca3a2d08b6870b16763c14c058b";
    const [state, setState] = useState({
        s: "",
        movies: [],
        selected: undefined})

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

      const closePopup = () => {
        setState(prevState =>{
          return {...prevState, selected:undefined}
        })
      }
      

      const addMovie = () =>{
        console.log("selected", state.selected)
        createShowing(state.selected.tmdbid);
/*
        var array = [{
          "tmdbid": state.selected.id,
          "name": state.selected.original_title,
          "description": state.selected.overview,
          "year": 0,
          "posterurl": state.selected.poster_path
        }];
    */
    
        setState(prevState =>{
          return {...prevState, s:""}
        });
        setState(prevState =>{
          return {...prevState, results:[]}
        });
        setState(prevState =>{
          return {...prevState, selected:undefined}
        })
      }

      
    return (
        <div>
            <div className="row_posters">
        
        {state.movies.map((movie) => (
            <Poster movie= {movie} isLargeRow = {true} baseUrl = {baseUrl} handleClick = {handleClick}></Poster>
          ))}
        </div>
        <Popup baseUrl= {baseUrl} selected={state.selected} 
              open = {typeof state.selected != "undefined"} 
              handleClose={closePopup} 
              addMovie = {addMovie} 
      /> 
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