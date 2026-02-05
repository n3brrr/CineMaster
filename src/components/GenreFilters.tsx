import useMovies from "../hooks/useMovies";

export default function GenreFilters() {
  const { getMoviesByGenre } = useMovies();
  return (
    <div className="flex gap-4 m-10">
      <button
        className="bg-red-500 bg-linear-to-r from-red-500/60 to-red-900/60 border-white text-white p-2 rounded-full hover:bg-red-600 hover:scale-115 transition-all duration-300 w-24"
        onClick={() => getMoviesByGenre(28, "action")}
      >
        Action
      </button>
      <button
        className="bg-red-500 bg-linear-to-r from-red-500/60 to-red-900/60 border-white text-white p-2 rounded-full hover:bg-red-600 hover:scale-115 transition-all duration-300 w-24"
        onClick={() => getMoviesByGenre(35, "comedy")}
      >
        Comedy
      </button>
      <button
        className="bg-red-500 bg-linear-to-r from-red-500/60 to-red-900/60 border-white text-white p-2 rounded-full hover:bg-red-600 hover:scale-115 transition-all duration-300 w-24"
        onClick={() => getMoviesByGenre(27, "horror")}
      >
        Horror
      </button>
      <button
        className="bg-red-500 bg-linear-to-r from-red-500/60 to-red-900/60 border-white text-white p-2 rounded-full hover:bg-red-600 hover:scale-115 transition-all duration-300 w-24"
        onClick={() => getMoviesByGenre(16, "animation")}
      >
        Animation
      </button>
    </div>
  );
}
