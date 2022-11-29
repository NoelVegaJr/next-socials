import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../context/user-context";
import { trpc } from "../lib/trpc";
import Posts from "./Posts";
import ProfileBox from "./ProfileBox";

interface IProfilePageProps {
  profile: string;
}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = ({
  profile,
}) => {
  const userCtx = useContext(UserContext);

  const user = trpc.user.getUserByUsername.useQuery({
    username: profile,
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
