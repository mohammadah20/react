import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Release date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default MovieDetails;
