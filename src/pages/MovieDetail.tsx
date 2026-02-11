import { useNavigate, useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="p-10 text-white">
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer tex-red-500/70 hover:text-red-500 transition-colors"
      >
        ← Back to Home
      </button>
      <h1 className="m-10 text-white text-2xl font-bold">
        Detail of movie: {id}
      </h1>
    </div>
  );
}
