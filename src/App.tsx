import "./styles/App.css";
import MovieCard from "./components/MovieCard";
import useMovies from "./hooks/useMovies";
import SearchBar from "./components/SearchBar";
import GenreFilters from "./components/GenreFilters";
import SortSelector from "./components/SortSelector";
import Loading from "./components/Loading/Loading";

function App() {
  const { movies, loading, sortBy, setSortBy, setGenre, setQuery } =
    useMovies();

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="m-15">
      <h1
        className="text-4xl text-center text-white tracking-wider font-bold uppercase mt-5 cursor-crosshair"
        onClick={() => {
          setGenre(null);
          setQuery("");
          setSortBy("popularity.desc");
        }}
      >
        CineMaster
      </h1>
      <SearchBar
        onSearch={(text) => {
          setGenre(null);
          setQuery(text);
        }}
      />
      <GenreFilters
        onGenreClick={(id) => {
          setQuery("");
          setGenre(id);
        }}
      />
      <SortSelector currentSort={sortBy} onSortChange={setSortBy} />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
