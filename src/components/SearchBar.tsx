import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { trpc } from "../lib/trpc";
import SearchResults from "./SearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/user-context";

interface ISearchBarProps {}

const SearchBar: React.FunctionComponent<ISearchBarProps> = ({}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isTypeing, setIsTypeing] = useState(false);

  const handleChange = async (text: string) => {
    setIsTypeing(true);
    setSearchValue(text);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleChange(searchValue);
      setIsTypeing(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  return (
    <div className="w-full h-16 bg-white items-center flex   mb-1">
      <div className="flex flex-col ">
        <div className="border rounded-xl px-2 py-1 w-96 flex gap-2 items-center">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            className="outline-none "
            placeholder="Search Code Fork"
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="relative">
          {searchValue && !isTypeing && <SearchResults search={searchValue} />}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
