import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import * as React from "react";
import Posts from "../components/Posts";
import ProfileBox from "../components/ProfileBox";
import SideNav from "../components/SideNav";
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
    <div className="min-h-screen w-full  flex">
      {/* <Navbar userId={authSession?.user.id} /> */}
      <SideNav username={authSession?.user.username} />

      {user.data && (
        <div className=" flex flex-col  w-full">
          {user.data && (
            <ProfileBox
              loggedOnUserId={authSession?.user.id}
              user={user.data}
            />
          )}
          <Posts posts={user.data.posts} userId={user.data.id} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
