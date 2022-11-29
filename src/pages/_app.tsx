import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../lib/trpc";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import UserProvider from "../context/user-context";
import ViewContextProvider from "../context/view-context";
import SideNav from "../components/SideNav";
import Layout from "./Layout";
import MessagesProvider from "../context/messages-context";
config.autoAddCss = false;

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ViewContextProvider>
          <Layout>
            <MessagesProvider>
              <Component {...pageProps} />
            </MessagesProvider>
          </Layout>
        </ViewContextProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
