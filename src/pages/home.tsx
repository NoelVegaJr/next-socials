import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import * as React from "react";
import { useContext, useState } from "react";
import ConnectWithBox from "../components/ConnectWithBox";
import HomePage from "../components/homePage";
import MessagesPage from "../components/messagesPage";
import NewPostForm from "../components/NewPostForm";
import Posts from "../components/Posts";
import ProfileBox from "../components/ProfileBox";
import ProfilePage from "../components/profilePage";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import MessagesProvider from "../context/messages-context";
import { UserContext } from "../context/user-context";
import { ViewContext } from "../context/view-context";
import { trpc } from "../lib/trpc";

interface IFeedProps {}

const Feed: React.FunctionComponent<IFeedProps> = (IFeedProps) => {
  const userCtx = useContext(UserContext);
  const viewCtx = useContext(ViewContext);

  switch (viewCtx.view) {
    case "home":
      return <HomePage />;
    case "messages":
      return <MessagesPage />;
    default:
      return <ProfilePage profile={viewCtx.view} />;
  }
};

export default Feed;
