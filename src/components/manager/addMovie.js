import React, { useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBox from "../Search/search-box.js";
import SearchBar from "./Search.js"
import axios from "axios";
import Search from "./Search.js";
import Poster from "./Poster.js";
import Typography from '@material-ui/core/Typography';
import Popup from "./Popup.js";
function AddMovie(){
  const { getAccessTokenSilently } = useAuth0();

  const [state, setState] = useState({
    s: "",
    movies: [],
    selected: undefined})
  const [results, setResults] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const url = "https://api.themoviedb.org/3/search/movie?api_key=d73ffca3a2d08b6870b16763c14c058b";
  const search = (e) =>{
    if(e.key ==="Enter"){
      axios(url + "&query=" + state.s).then((data)=>{
        setState(prevState =>{
          console.log(data.data.results)
          return {...prevState, movies:data.data.results}
        })
      })
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;
    setState(prevState =>{
      return {...prevState, s:s}
    });
  }
  // when you click on a poster
  const handleClick = (movie) => {
    console.log(movie);
    //title = (movie.name? movie.name : movie.title);
    
    setState(prevState =>{
      return {...prevState, selected:movie}
    })
  };
    // to close the popup
  const closePopup = () => {
    setState(prevState =>{
      return {...prevState, selected:undefined}
    })
  }
  const addMovie = async () =>{
    console.log("selected", state.selected)
    
    var array = [{
      "tmdbid": state.selected.id,
      "name": state.selected.original_title,
      "description": state.selected.overview,
      "year": 0,
      "posterurl": state.selected.poster_path
    }];

    const accessToken = await getAccessTokenSilently({
      audience: "MainAPI",
      scope: ""
    });

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/movies", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.send(JSON.stringify(array));

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
        <Typography>Choose a Movie to Add to the Theater</Typography>
        <Search handleInput ={handleInput} search = {search}/>
        <div className="row">
      {/* Passing Row title as text for h2 */}
      <h2>Results</h2>
      <div className="row_posters">
        {/* several row_poster(s) */}
        {state.movies.map((movie) => (
          <Poster movie= {movie} isLargeRow = {true} baseUrl = {baseUrl} handleClick = {handleClick}></Poster>
        ))}
      </div>
{/*if selected is NOT undefined (there is something selected), then a popup will open
onClick={() => this.handleClick(id)} */}
      <Popup baseUrl= {baseUrl} selected={state.selected} 
      open = {typeof state.selected != "undefined"} 
      handleClose={closePopup} 
      addMovie = {addMovie} 
      /> 

    </div>



        </div>
      )
    }
  

  export default AddMovie;


  /*
        var array = [
        { "tmdbid": 807,
            "name": "",
            "description": "",
            "year": 0,
            "posterurl": ""
        }] 

    var array = [
        { "tmdbid": 807,
          "name": "Se7en",
          "description": "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the \"seven deadly sins\" in this dark and haunting film that takes viewers from the tortured remains of one victim to the next. The seasoned Det. Sommerset researches each sin in an effort to get inside the killers mind, while his novice partner, Mills, scoffs at his efforts to unravel the case.",
          "year": 1995,
          "posterurl": "GQP6noTBKsYiAYyn8PYXFcsSgH.jpg"
        }
      ];

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://silo.soic.indiana.edu:29102/api/movies", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(array));

      
    console.log(array);
*/
