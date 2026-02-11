import type { Movie } from "../hooks/movie";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="relative flex flex-col items-center justify-center border border-red-500/30 rounded-lg m-2 shadow-lg shadow-black aspect-ratio-2/3 hover:scale-105 transition-all duration-300 cursor-pointer">
      <Link
        to={`/movie/${movie.id}`}
        className="w-full h-full object-cover rounded-lg"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg"
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 rounded-lg w-full pt-1">
          <h2 className="text-white font-bold">{movie.title}</h2>
          <p className="text-white font-semibold">{movie.release_date}</p>
          <p
            className={`font-bold ${
              movie.vote_average > 7
                ? "text-white bg-green-500 rounded-full w-fit px-2 shadow-lg"
                : movie.vote_average > 5
                  ? "text-white bg-yellow-500 rounded-full w-fit px-2 shadow-lg"
                  : "text-white bg-red-500 rounded-full w-fit px-2 shadow-lg"
            }`}
          >
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
}
