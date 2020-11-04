import React from 'react'



function Poster({ movie, isLargeRow,  baseUrl, handleClick }) {
  
	return (
		

            <img
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            key={movie.tmdbid}
            onClick={() => handleClick(movie)}
            
            src={baseUrl + movie.posterurl}
            alt={movie.name}
          />


        
	)
}

export default Poster

/*
https://image.tmdb.org/t/p/original/vzvKcPQ4o7TjWeGIn0aGC9FeVNu.jpgundefined

*/