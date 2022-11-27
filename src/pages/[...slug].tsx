import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import * as React from "react";
import Navbar from "../components/NavBar";
import Posts from "../components/Posts";
import ProfileBox from "../components/ProfileBox";
import { trpc } from "../lib/trpc";

interface IProfilePageProps {
  username: string;
  authSession: Session;
}

export const getServerSideProps = async (context: NextPageContext) => {
  console.log(context.query.slug);

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
  let username;
  if (context.query.slug) {
    username = context.query.slug[0];
  }

  return { props: { username: username, authSession: session } };
};

const ProfilePage: React.FunctionComponent<IProfilePageProps> = ({
  username,
  authSession,
}: IProfilePageProps) => {
  const user = trpc.user.getUserByUsername.useQuery({ username });
  console.log(user);

  return (
    <div className="min-h-screen w-full bg-slate-100">
      <Navbar userId={authSession?.user.id} />
      {user.data && (
        <>
          <div className="px-20 flex flex-col gap-8 w-full">
            {user.data && (
              <ProfileBox
                loggedOnUserId={authSession?.user.id}
                user={user.data}
              />
            )}
            <Posts posts={user.data.posts} userId={user.data.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
