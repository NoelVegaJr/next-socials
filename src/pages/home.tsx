import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import * as React from "react";
import ConnectWithBox from "../components/ConnectWithBox";
import NewPostForm from "../components/NewPostForm";
import Posts from "../components/Posts";
import ProfileBox from "../components/ProfileBox";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import { trpc } from "../lib/trpc";

interface IFeedProps {
  authSession: Session;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  if (!session.user.username) {
    return {
      redirect: {
        permanent: false,
        destination: "/user-details",
      },
      props: {},
    };
  }

  return {
    props: {
      authSession: session,
    },
  };
}

const Feed: React.FunctionComponent<IFeedProps> = ({
  authSession,
}: IFeedProps) => {
  const userId = authSession?.user.id;

  const posts = trpc.post.getHomePosts.useQuery({ userId });
  const newConnections = trpc.user.listNewConnections.useQuery({
    userId,
    count: 3,
  });

  return (
    <div className="min-h-screen w-full  flex">
      {authSession && newConnections.data && (
        <>
          <SideNav userId={userId} username={authSession?.user.username} />
          <div className="flex flex-col  grow border-r-2">
            <p className="font-bold text-xl p-4">Home</p>

            <NewPostForm avatarSrc={authSession.user.image} userId={userId} />
            {posts.data && <Posts posts={posts.data} userId={userId} />}
          </div>
          <div className="flex flex-col px-4">
            <SearchBar userId={userId} />
            {newConnections.data.length > 0 && (
              <ConnectWithBox
                connections={newConnections.data}
                userId={userId}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Feed;
