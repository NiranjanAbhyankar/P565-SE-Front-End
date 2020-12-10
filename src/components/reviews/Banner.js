import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "../../axios";
import requests from "../../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const movieSelected = JSON.parse(localStorage.getItem("selectedMovie"));

  useEffect(() => {
    setMovie(movieSelected);
  }, []);



  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.posterurl || movie?.poster_path  }"
      )`,
      }}
    >
      
      {/*We don't have access to a proper backdrop path, so the image will look very wonky */}
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        
        <h1 className="banner_description">{movie?.description} <br/><br/><a href ="/purchase"><Button color="primary" variant="contained">Book a Ticket</Button></a></h1>
        
        
      </div>   
      <div className="banner-fadeBottom" />   
    </header>
    
  );
}
export default Banner;
