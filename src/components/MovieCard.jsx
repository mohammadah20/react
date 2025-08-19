import React from "react";
import { Link } from "react-router-dom";


const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/"

const buildPosterUrl = (movie, size = "w500") => {
  const path = movie?.poster_path
  return path ? `${TMDB_IMAGE_BASE}${size}${path}` : "/placeholder-poster.svg"
}
  const MovieCard = (props ,{movie : { title , vote_average , poster_path , release_date , original_language }}) => {

    return(
         <li>
      <Link to={`/movie/${movie.id}`}>
        <img src={buildPosterUrl(movie)} alt={movie.title} loading="lazy" />
      </Link>
      <h3>
        <Link to={`/movie/${movie.id}`}>{props.movie.title}</Link>
      </h3>
    </li>
        
    )
}
export default MovieCard 