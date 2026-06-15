import { useState } from "react";
import InteractiveHoverButton from "./InteractiveHoverButton";
import TypeWriter from "./TypeWriter";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (s: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <form
      className="flex my-15  justify-center gap-5 "
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(text);
        setText("");
      }}
    >
      <div className="relative w-2/4 z-10">
      {!text && (
        <div className="absolute inset-0 flex items-center px-2 pointer-events-none z-10">
          <TypeWriter />
        </div>
      )}
      <input
        type="text"
        placeholder={text}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-white border border-red-500/30 rounded-lg p-2 w-full bg-black 
         hover:border-red-800/90 transition-all duration-300
         focus:border-red-800 focus:outline-none"
      />
      </div>
      <InteractiveHoverButton>
        <span className="text-white">Search</span>
      </InteractiveHoverButton>
    </form>
  );
}
