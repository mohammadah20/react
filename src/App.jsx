import { Route,Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MoviesDetails";
const App = () => {
 return(
  <main>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movie/:id" element={<MovieDetails/>} />
      </Routes>
  </main>
 )
};

export default App
