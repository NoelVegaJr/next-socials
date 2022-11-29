import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";

interface IUserProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const UserContext = createContext<Session["user"]>({
  username: "",
  id: "",
  name: "",
  email: "",
  image: "",
});

const UserProvider = ({ children }: IUserProviderProps) => {
  const { data: session } = useSession();

  return (
    <UserContext.Provider
      value={
        session?.user ?? {
          username: "",
          id: "",
          name: "",
          email: "",
          image: "",
        }
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
