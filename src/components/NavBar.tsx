import * as React from "react";

interface INavBarProps {}

const Navbar: React.FunctionComponent<INavBarProps> = (props) => {
  return (
    <div className="w-full h-16 bg-white items-center flex px-12  gap-20 mb-8">
      <p className="text-teal-400 font-bold text-3xl">Devy</p>
      <input
        type="text"
        className="outline-none border rounded-xl px-2 py-1 w-96"
        placeholder="Search"
      />
    </div>
  );
};

export default Navbar;
