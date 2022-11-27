import * as React from "react";
import Image from "next/image";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../lib/trpc";
import FollowButton from "./FollowButton";
import { useState } from "react";
import Modal from "./Modal";

interface IProfileBoxProps {
  user: any;
  loggedOnUserId: string;
}

const ProfileBox: React.FunctionComponent<IProfileBoxProps> = ({
  user,
  loggedOnUserId,
}: IProfileBoxProps) => {
  const [editingProfile, setEditingProfile] = useState(false);

  return (
    <div className="flex flex-col gap-6 border-b-2 bg-white rounded w-full">
      <div className=" gap-4 items-center">
        <div className="bg-slate-500 w-full h-52" />
        <div className="relative ">
          <div className="absolute -top-16 left-10 h-fit w-fit p-1 bg-white rounded-full">
            <Avatar src={user.image} className="w-32 h-32" />
          </div>
        </div>
        <div className="p-4 flex justify-end">
          {user.id !== loggedOnUserId ? (
            <FollowButton
              loggedInUserId={loggedOnUserId}
              profileUserId={user.id}
              isFollowing={user.followers.find(
                (f: any) => f.followerUserId === loggedOnUserId
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
            <div className="bg-slate-800 text-white rounded-lg p-4">
              <form>
                <div className="mb-8 flex justify-between">
                  <button>
                    <Avatar src={user.image} className="w-32 h-32" />
                  </button>
                  <button className="self-start bg-slate-300 text-black px-6 py-1 rounded-3xl font-semibold">
                    Save
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="border rounded p-1 px-4">
                    <p>Name</p>
                    <input
                      type="text"
                      className="w-full outline-none bg-transparent text-white"
                    />
                  </div>
                  <div className="border rounded p-1 px-4">
                    <p>Bio</p>
                    <input
                      type="text"
                      className="w-full outline-none bg-transparent text-white"
                    />
                  </div>

                  <div className="border rounded p-1 px-4">
                    <p>Website</p>
                    <input
                      type="text"
                      className="w-full outline-none bg-transparent text-white"
                    />
                  </div>
                </div>
              </form>
            </div>
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
