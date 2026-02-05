import "./App.css";
import MovieCard from "./components/MovieCard";
import useMovies from "./hooks/useMovies";
import SearchBar from "./components/SearchBar";
import GenreFilters from "./components/GenreFilters";

function App() {
  const { movies, loading, getMovies, getMoviesByGenre } = useMovies();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="m-15">
      <h1
        className="text-4xl text-center text-white tracking-wider font-bold uppercase mt-5"
        //onClick={() => }
      >
        CineMaster
      </h1>
      <SearchBar onSearch={getMovies} />
      <GenreFilters onGenreClick={getMoviesByGenre} />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
