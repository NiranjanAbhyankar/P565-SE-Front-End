const API_KEY = "d73ffca3a2d08b6870b16763c14c058b";

const requests = {
  fetchTrending: `/trending/movies/week?api_key=${API_KEY}&language=en-US`,
  fetchFamily: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
};

export default requests;
