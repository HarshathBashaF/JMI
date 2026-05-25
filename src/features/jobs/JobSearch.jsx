import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const JobSearch = ({ setSearch }) => {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input);

  // update parent when debounce changes
  useState(() => {
    setSearch(debounced);
  }, [debounced]);

  return (
    <input
      className="w-full md:w-80 px-4 py-2 border rounded-lg"
      placeholder="Search jobs..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default JobSearch;