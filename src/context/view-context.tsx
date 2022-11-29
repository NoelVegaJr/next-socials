import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

interface IUserProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface IViewContext {
  view: string;
  setView: (view: string) => void;
}

export const ViewContext = createContext<IViewContext>({
  view: "",
  setView: (view: string) => {},
});

const ViewContextProvider = ({ children }: IUserProviderProps) => {
  const [view, setView] = useState("home");
  const handleChangeView = (view: string) => {
    setView(view);
  };

  return (
    <ViewContext.Provider value={{ view, setView: handleChangeView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContextProvider;
