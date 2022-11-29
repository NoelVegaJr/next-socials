import * as React from "react";
import Image from "next/image";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../lib/trpc";
import FollowButton from "./FollowButton";
import { useContext, useState } from "react";
import Modal from "./Modal";
import EditProfileForm from "./EditProfileForm";
import Banner from "./Banner";
import { UserContext } from "../context/user-context";

interface IProfileBoxProps {
  user: any;
}

const ProfileBox: React.FunctionComponent<IProfileBoxProps> = ({
  user,
}: IProfileBoxProps) => {
  const userCtx = useContext(UserContext);
  const [editingProfile, setEditingProfile] = useState(false);

  return (
    <div className="flex flex-col gap-6 border-b-2 bg-white rounded w-full">
      <div className=" gap-4 items-center">
        <Banner src={user.banner} className="w-full h-60" />
        <div className="relative ">
          <div className="absolute -top-16 left-10 h-fit w-fit p-1 bg-white rounded-full">
            <Avatar src={user.image} className="w-32 h-32" />
          </div>
        </div>
        <div className="p-4 flex justify-end">
          {user.id !== userCtx.id ? (
            <FollowButton
              loggedInUserId={userCtx.id}
              profileUserId={user.id}
              isFollowing={user.followers.find(
                (f: any) => f.followerUserId === userCtx.id
              )}
            />
          ) : (
            <button
              onClick={() => setEditingProfile(true)}
              className="border p-2 px-4 rounded-3xl  border-slate-300 font-semibold"
            >
              Edit profile
            </button>
          )}
        </div>
        {editingProfile && (
          <Modal close={() => setEditingProfile(false)}>
            <EditProfileForm
              user={user}
              close={() => setEditingProfile(false)}
            />
          </Modal>
        )}

        <div className="px-8 mt-8">
          <p className="font-bold text-2xl">{user.name}</p>
          <p className="-mt-1">@{user.username}</p>
          <div className="flex items-center gap-2 text-sm mt-2">
            <FontAwesomeIcon icon={faCalendarDays} className="text-slate-400" />

            <p>
              Joined{" "}
              {new Date(user.joinDate).toLocaleDateString("en-us", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <span className="font-bold">{user.following.length}</span>
              <span className="text-sm">Following</span>{" "}
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-bold">{user.followers.length}</span>
              <span className="text-sm">Followers</span>{" "}
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default ProfileBox;
