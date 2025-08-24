 import React from 'react'
 import { Link } from 'react-router-dom'

const MovieCard = ({ movie}) => {
  return (
    <li className="movie-card">
      <Link to={`/movie/${movie.id}`}>
       <img
        src={movie.poster_path ?
          `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'}
        alt={movie.title}
      />

      <h3>{movie.title}</h3>
      </Link>
     
    </li>
  )
}
export default MovieCard