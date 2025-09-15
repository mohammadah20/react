 import React from 'react'
 import { Link } from 'react-router-dom'//کامپوننتی از کتابخانهٔ react-router-dom است که به‌جای <a> برای ناوبری داخلی استفاده می‌شود.
//مزیت: لینک داخلی بدون رفرش کامل صفحه مسیر را تغییر می‌دهد (client-side routing).

const MovieCard = ({ movie}) => {
  return (
   //<Link to={`/movie/${movie.id}`}> هنگام کلیک، کاربر به مسیر /movie/<id> هدایت می‌شود
    <li className="movie-card">
      <Link to={`/movie/${movie.id}`}>
      
       <img
        src={movie.poster_path ?
          `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-movie.png'}
        alt={movie.title}
      />

      <h3>{movie.title}</h3>
      </Link>
     
    </li>
   
    
  )
}
export default MovieCard