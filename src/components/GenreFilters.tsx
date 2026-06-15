import ShineButton from "./ShineButton";

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
        <ShineButton onClick={() => onGenreClick(genre.id, genre.name)}>
          {genre.name}
        </ShineButton>
      ))}
    </div>
  );
}
