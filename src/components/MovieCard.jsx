import React from "react";
import { Link } from "react-router-dom";


const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/"

const buildPosterUrl = (movie, size = "w500") => {
 if (movie?.poster_path) {
    return `https://image.tmdb.org/t/p/${size}${movie.poster_path}`
  }
  
  if (movie?.poster_url) {
    return movie.poster_url
  }
 
  return "/placeholder-poster.svg"
}
  const MovieCard = ({movie }) => {
   const movieId=movie.id || movie.movie_id;
    return(
         <li>
      <Link to={`/movie/${movie.id}`}>
        <img src={buildPosterUrl(movie)} alt={movie.title} loading="lazy" />
      </Link>
      <h3>
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
      </h3>
    </li>
        
    )
}
export default MovieCard 