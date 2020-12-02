import React from 'react'
import "./Row.css";


function Poster({ movie, isLargeRow,  baseUrl, handleClick }) {
  
	return (
		

            <img
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${baseUrl}${
              isLargeRow ? movie.posterurl : movie?.poster_path
            }`}
            alt={movie.name}
          />


        
	)
}

export default Poster