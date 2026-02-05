import useMovies from "../hooks/useMovies";

export default function SearchBar() {
  const { query, setQuery } = useMovies();
  return (
    <div className="flex m-10 justify-center gap-5">
      <input
        type="text"
        placeholder="Search"
        className="text-white border border-red-500/30 rounded-lg p-2 w-1/2 bg-blur-sm
         hover:border-red-800/90 transition-all duration-300
         focus:border-red-800 focus:outline-none"
      />
      <button
        className="text-white bg-linear-to-r from-red-500/60 to-red-900/60 rounded-lg p-2 px-10 hover:scale-105 transition-all duration-300"
        onClick={() => setQuery(query)}
      >
        Search
      </button>
    </div>
  );
}
