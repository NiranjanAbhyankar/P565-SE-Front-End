import React from "react";

import CreateReview from "../components/reviews/createReview.js";
import DisplayReviews from "../components/reviews/displayReviews.js";

const AboutMovie = () => {
    const movie = JSON.parse(localStorage.getItem("selectedMovie"));
    const base_url = "https://image.tmdb.org/t/p/original/";
      return (
        <div >
            <img
            height = {300}
            key={movie.id}

            src={base_url + 
              movie.posterurl
            }
            alt={movie.name}
          />
            <CreateReview/>
            <DisplayReviews/>
        </div>   
        );
      };
  
  export default AboutMovie;