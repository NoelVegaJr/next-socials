import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import * as React from "react";
import { useContext } from "react";
import Posts from "../components/Posts";
import ProfileBox from "../components/ProfileBox";
import SideNav from "../components/SideNav";
import { UserContext } from "../context/user-context";
import { trpc } from "../lib/trpc";

interface IProfilePageProps {
  username: string;
  authSession: Session;
}

// export const getServerSideProps = async (context: NextPageContext) => {
//   console.log(context.query.slug);

//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//       props: {},
//     };
//   }

//   if (!session.user.username) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/user-details",
//       },
//       props: {},
//     };
//   }
//   let username;
//   if (context.query.slug) {
//     username = context.query.slug[0];
//   }

//   return { props: { username: username, authSession: session } };
// };

const ProfilePage: React.FunctionComponent<
  IProfilePageProps
> = ({}: IProfilePageProps) => {
  const userCtx = useContext(UserContext);

  const user = trpc.user.getUserByUsername.useQuery({
    username: userCtx.username,
  });

  return (
    <>
      {user.data && (
        <div className=" flex flex-col  w-full">
          {user.data && <ProfileBox user={user.data} />}
          <Posts posts={user.data.posts} />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
