import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./MoviesGrid.css";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [movies, setMovies] = useState([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const getSearchedmovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}`;

    getSearchedmovies(searchWithQueryUrl);
  }, [query]);

  return (
    <div>
      <div className="container">
        <h2 className="title">
          Resultados para: <span className="query-text">{query}</span>
        </h2>
      </div>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
