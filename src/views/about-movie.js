import React from "react";
import CreateReview from "../components/reviews/createReview.js";
import DisplayReviews from "../components/reviews/displayReviews.js";
import Button from '@material-ui/core/Button';
import Banner from "../components/reviews/Banner";



const AboutMovie = () => {
    const movie = JSON.parse(localStorage.getItem("selectedMovie"));
    const base_url = "https://image.tmdb.org/t/p/original/";
      return (
        <div >
          <Banner/>
          
            <CreateReview/>
            <br/>
            <DisplayReviews/>
        </div>   
        );
      };
  
  export default AboutMovie;