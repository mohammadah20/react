import Search from './component/search.jsx';
import {  useEffect,useState } from 'react';
import Spinner from './component/Spinner.jsx';
import MovieCard from './component/MovieCard.jsx';
import {useDebounce} from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;

const API_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_ACCESS_TOKEN}`, 
  },
};


const App= () => {
  const [debouncedSearchTerm,setDebouncedSearchTerm] = useState('');
  const [searchTerm,setSearchTerm] = useState('');
  const [moviesList,setMoviesList] =useState([]);
  const [errorMessage,setErrorMessage] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [trendingMovies,setTrendingMovies] = useState([]);

useDebounce( () =>setDebouncedSearchTerm(searchTerm),500 ,[searchTerm])
  const fetchMovies = async(query='')=>{

    setIsLoading(true);
    setErrorMessage('');

    try{
      const endPoint= query 
      ? `${API_BASE_URL}/search/movie?query=${ encodeURIComponent(query)}`
      
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; 
      
      const response= await fetch(endPoint,API_OPTIONS);
    if(!response.ok){
      throw new Error('Failed to fetch movies');
    }
    const data=await response.json();

    if(!data.results || data.results.length===0){
      setErrorMessage('No movie found');
      setMoviesList([]);
      return;
    }
    setMoviesList(data.results);
     
    if (query && data.results.length > 0) {
  try {
    await updateSearchCount(query, data.results[0]);
  } catch (err) {
    console.error("updateSearchCount failed:", err);

  }
}

    }catch(error){
      console.error(`Error Fething Movies:`,error);
      setErrorMessage('Error fething movies.Please try again later');
    }finally{
      setIsLoading(false);
    }
  }
  const loadTrendingMovies = async () => {
    try {
      const movies=await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {

      console.error(`Error Fetching Movies:`,error);
      
      
    }

  }

useEffect(()=>{
      fetchMovies(debouncedSearchTerm);
      loadTrendingMovies();
},[debouncedSearchTerm])
useEffect(()=>{
  loadTrendingMovies();
},[]);
  return(
  
  <main>  
    <div className='pattern'>

    <div className='wrapper'>

      <header>
        <img src="./public/hero-img.svg" alt="Hero Banner" />
        <h1>You Will Find <span className='text-gradient'>Movies</span> That You Will Enjoy </h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      
      </header>
      
      {trendingMovies.length>0 && (
        <section className='trending'>
         <h2>TrendingMovies</h2> 
         <ul>
          {trendingMovies.map((movie, index) => (
            <li key={index}>
              <p>{index+1}</p>
              <img src={movie.poster_url} alt={movie.title} />
            </li>
          ))}
         </ul>
        </section>
      )}
      <section className='all-movies'>
        
        <h2>All Movies</h2>
        
        {isLoading ?(
          <Spinner/>
        ) :errorMessage ?(
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            { moviesList.map((movie)=>(
               <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>
        ) }
      
      </section>
      
    </div>
  </div>
  </main>
  
)
};

export default App
