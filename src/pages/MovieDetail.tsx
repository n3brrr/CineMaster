import { useNavigate, useParams } from "react-router-dom";
import useMoviesDetails from "../hooks/useMoviesDetails";
import Loading from "../components/Loading/Loading";
import ShineBorderButton from "../components/ShineBorderButton";
import AnimatedShinyText from "../components/AnimatedShinyText";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const { movie } = useMoviesDetails(id!);
  const navigate = useNavigate();

  if (!movie) {
    return <Loading />;
  }

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 h-[80vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
      </div>
      <div className="relative z-10 p-10 pt-[55vh] max-w-6xl mx-auto">
        <AnimatedShinyText>
        {movie?.title}
        </AnimatedShinyText>
        <span className="flex gap-2">
          {movie?.genres.map((g) => (
            <span key={g.id} className="bg-red-500/70 px-2 py-1 rounded-full">
              {g.name}
            </span>
          ))}
        </span>
        <p className="my-6">{movie?.overview}</p>
        <div className="flex gap-5 items-center mt-5">
          <p className="bg-red-500/70 px-2 py-1 rounded-full">
            {hours}h {minutes}min
          </p>
          <p
            className={`font-bold ${
              movie.vote_average > 7
                ? "bg-green-500 rounded-full w-fit px-2 py-1 shadow-lg"
                : movie.vote_average > 5
                  ? "bg-yellow-500/90 rounded-full w-fit px-2 py-1 shadow-lg"
                  : "bg-red-500 rounded-full w-fit px-2 py-1 shadow-lg"
            }`}
          >
            {movie.vote_average.toFixed(1)}
          </p>
          <p className="bg-red-500/70 px-2 py-1 my-5 rounded-full">
            {movie?.release_date}
          </p>
        </div>
        <ShineBorderButton>
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg p-2 cursor-pointer tex-red-500/70"
        >
          ← Back to Home
        </button>
        </ShineBorderButton>
      </div>
    </div>
  );
}
