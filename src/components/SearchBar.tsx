import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (s: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <form
      className="flex m-10 justify-center gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(text);
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-white border border-red-500/30 rounded-lg p-2 w-1/2 bg-blur-sm
         hover:border-red-800/90 transition-all duration-300
         focus:border-red-800 focus:outline-none"
      />
      <button
        type="submit"
        className="text-white bg-linear-to-r from-red-500/60 to-red-900/60 rounded-lg p-2 px-10 hover:scale-105 transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
}
