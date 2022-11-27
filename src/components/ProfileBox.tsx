import * as React from "react";
import Image from "next/image";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../lib/trpc";
import FollowButton from "./FollowButton";

interface IProfileBoxProps {
  user: any;
  loggedOnUserId: string;
}

const ProfileBox: React.FunctionComponent<IProfileBoxProps> = ({
  user,
  loggedOnUserId,
}: IProfileBoxProps) => {
  console.log("PROFILE BOX: ", user.followers);

  return (
    <div className="flex flex-col gap-6 bg-white rounded w-full">
      <div className=" gap-4 items-center">
        <div className="bg-slate-500 w-full h-52" />
        <div className="relative ">
          <div className="absolute -top-16 left-10 h-fit w-fit p-1 bg-white rounded-full">
            <Avatar src={user.image} className="w-32 h-32" />
          </div>
        </div>
        <FollowButton
          loggedInUserId={loggedOnUserId}
          profileUserId={user.id}
          isFollowing={user.followers.find(
            (f: any) => f.followerUserId === loggedOnUserId
          )}
        />
        <div className="px-5 mt-12">
          <p className="font-bold text-2xl">{user.name}</p>
          <p>@{user.username}</p>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <span className="font-bold">{user.followers.length}</span>
              <span>Followers</span>{" "}
            </div>
            <div className="flex gap-2">
              <span className="font-bold">{user.following.length}</span>
              <span>Following</span>{" "}
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default ProfileBox;
