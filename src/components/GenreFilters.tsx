const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 16, name: "Animation" },
];

export default function GenreFilters({
  onGenreClick,
}: {
  onGenreClick: (id: number, name: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className="bg-red-500 bg-linear-to-r from-red-500/80 to-red-900/80 border-white text-white p-2 rounded-full hover:bg-red-600/80 hover:scale-115 transition-all duration-300 w-24"
          onClick={() => onGenreClick(genre.id, genre.name)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
