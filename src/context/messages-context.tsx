import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { trpc } from "../lib/trpc";
import { UserContext } from "./user-context";

interface IMessagesContextProps {
  children: JSX.Element | JSX.Element[];
}

interface IMessagesContext {
  view: string;
  setView: (view: string) => void;
}

export const MessagesContext = createContext<any>([]);

const MessagesProvider = ({ children }: IMessagesContextProps) => {
  const userCtx = useContext(UserContext);
  const getConversationsQuery =
    trpc.messenger.getConversationsByUserId.useQuery({
      userId: userCtx.id,
    });

  return (
    <MessagesContext.Provider value={getConversationsQuery.data}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
