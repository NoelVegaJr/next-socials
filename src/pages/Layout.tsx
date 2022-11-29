import * as React from "react";
import SideNav from "../components/SideNav";

interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <div className="min-h-screen w-full  flex">
      <SideNav />
      {props.children}
    </div>
  );
};

export default Layout;
