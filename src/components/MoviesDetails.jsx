import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL= "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [Loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      
      try{
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setMovie(data);
     } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
     
    };


    fetchMovie();
  }, [id]);
  if(Loading)return <p>Loading...</p>
  if (!movie) return <p>Movie not found</p>;

  return (
    <div style={{padding:"20px", color:"#fff"}}>
      <h1>{movie.title}</h1>
      <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/fallback.png"} alt={movie.title} style={{with:"300px",borderRadius:"10px"}} />
      <h2>{movie.title}</h2>

      
      <p> <strong>Release date: </strong> {movie.release_date}</p>
      <p> <strong>Rating:</strong>  {movie.vote_average}</p>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;
