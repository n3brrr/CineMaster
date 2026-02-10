export default function SortSelector({
  currentSort,
  onSortChange,
}: {
  currentSort: string;
  onSortChange: (sort: string) => void;
}) {
  return (
    <div className="flex justify-end mb-4 sm:justify-center">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-black text-white border border-red-500/30 rounded-lg p-2 focus:outline-none"
      >
        <option className="text-white" value="popularity.desc">
          Popularity
        </option>
        <option className="text-white" value="vote_average.desc">
          Vote Average
        </option>
        <option className="text-white" value="release_date.desc">
          Release Date
        </option>
      </select>
    </div>
  );
}
