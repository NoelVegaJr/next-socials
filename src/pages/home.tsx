import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import * as React from "react";
import Navbar from "../components/NavBar";
import NewPostForm from "../components/NewPostForm";
import Posts from "../components/Posts";
import ProfileBox from "../components/ProfileBox";
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

  return (
    <div className="min-h-screen w-full  flex">
      {/* <Navbar userId={userId} /> */}
      <SideNav username={authSession?.user.username} />
      {authSession && (
        // <div className="px-20 flex gap-8">
        <div className="flex flex-col  grow ">
          <NewPostForm avatarSrc={authSession.user.image} userId={userId} />
          {posts.data && <Posts posts={posts.data} userId={userId} />}
        </div>
        // </div>
      )}
    </div>
  );
};

export default Feed;
