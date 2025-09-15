import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET", //این درخواست یک درخواست خواندن است
  headers: {  
    accept: "application/json", //هدر Accept به سرور می‌گوید که کلاینت انتظار دارد پاسخ به فرمت JSON برگردد.
    Authorization: `Bearer ${API_KEY}` //این یک هدر احراز هویت است
  }
};

const MoviesDetails = () => {
  const { id } = useParams(); //هوکی از react-router-dom هست که پارامترهای مسیر فعلی (route params) را برمی‌گرداند به صورت یک آبجکت.
  //گر route‌ ما"/movie/:id" باشه و URL فعلی /movie/550، حاصل useParams() می‌شه { id: "550" }.
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");

  useEffect(() => { //وقتی کامپوننت mount شد و هر بار که مقدار id تغییر کند، تابع داخل را اجرا کن
    const fetchMoviesDetails = async () => {
      try {
       
        const res = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS); //یک درخواست HTTP به endpoint جزئیات فیلم (/movie/{id}) فرستاده می‌شود
        const data = await res.json();
        setMovie(data);

        
        const videoRes = await fetch(`${API_BASE_URL}/movie/${id}/videos`, API_OPTIONS);//لیست ویدیوهای مرتبط با آن فیلم را از endpoint /movie/{id}/videos می‌گیرند.
        const videoData = await videoRes.json();

        const trailerObj = videoData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube" //فقط ویدیوهای از نوع تریلر و فقط ویدیوهایی که در YouTube هستند
        );

        if (trailerObj) setTrailer(trailerObj.key);//اگر تریلری پیدا بشه که از یوتیوب باشه، مقدار آن را در state به نام trailer ذخیره می‌کنیم.
        //  trailerObj.key در واقع کلید ویدیو است که یوتیوب برای آن ویدیو اختصاص داده است و با استفاده از این کلید می‌توان ویدیو را در یوتیوب نمایش داد.
      } catch (error) { 
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMoviesDetails(); //تابع فراخوانی میشود تا عملیات واقعی fetch اجرا شود.
  }, [id]); //وقتی id تغییر کند، جزئیات فیلم و ویدیوها را sequentially فراخوانی می‌کند، سپس اولین تریلر یوتیوب را انتخاب و key آن را ذخیره می‌کند.

  if (!movie) return <p className="text-center mt-10 text-2xl font-bold text-pink-700">Loading...</p>;

  return (//جزییات فیلم را نمایش میده  
    <div className="movie-detail max-w-6xl mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        
        <img
          className="w-full md:w-1/4 rounded-xl "
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-pink-500 to-pink-800 bg-clip-text text-transparent">
            {movie.title}
          </h1>

          <p className="text-lg text-blue-300">
            <span className="font-bold text-blue-400">Release Year :</span>{" "}
            {movie.release_date?.split("-")[0]}
          </p>

          <p className="text-2xl font-bold text-pink-600 ">
            Rating : {movie.vote_average?.toFixed(1)} / 10
          </p>

          <p className="text-lg leading-relaxed text-gray-200">
            <h1 className="text-2xl text-purple-400" style={{textAlign:"left"}}>The Story Of The Movie : </h1>
            {movie.overview}
          </p>
        </div>
      </div>

      
      {trailer && (
        <div className="trailer mt-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-300">🎥 Trailer</h2>
          <iframe
            width="100%"
            height="520"
            className="rounded-2xl shadow-xl"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MoviesDetails;  
