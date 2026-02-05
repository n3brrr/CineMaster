import "./App.css";
import MovieCard from "./components/MovieCard";
import useMovies from "./hooks/useMovies";
import SearchBar from "./components/SearchBar";
import GenreFilters from "./components/GenreFilters";

function App() {
  const { movies, loading, getMovies } = useMovies();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="text-4xl text-center text-white tracking-wider font-bold uppercase mt-10">
        CineMaster
      </h1>
      <SearchBar onSearch={getMovies} />
      <GenreFilters />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 m-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default App;
