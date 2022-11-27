import * as React from "react";
import { useEffect, useState } from "react";
import { trpc } from "../lib/trpc";
import SearchResults from "./SearchResults";

interface INavBarProps {
  userId: string;
}

const Navbar: React.FunctionComponent<INavBarProps> = ({ userId }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isTypeing, setIsTypeing] = useState(false);

  const handleChange = async (text: string) => {
    setIsTypeing(true);
    setSearchValue(text);
    // const results = await refetch();
    // setUsers(results);
    console.log("hello");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      // handleChange(searchValue);
      handleChange(searchValue);
      setIsTypeing(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  return (
    <div className="w-full h-16 bg-white items-center flex px-12  gap-20 mb-8">
      <p className="text-blue-600 font-bold text-3xl">Code Fork</p>
      <div className="flex flex-col ">
        <input
          type="text"
          className="outline-none border rounded-xl px-2 py-1 w-96"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="relative">
          {searchValue && !isTypeing && (
            <SearchResults userId={userId} search={searchValue} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
