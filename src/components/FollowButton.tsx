import * as React from "react";
import { useState } from "react";
import { trpc } from "../lib/trpc";

interface IFollowButtonProps {
  loggedInUserId: string;
  profileUserId: string;
  isFollowing: boolean;
}

const FollowButton: React.FunctionComponent<IFollowButtonProps> = ({
  isFollowing,
  loggedInUserId,
  profileUserId,
}: IFollowButtonProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const utils = trpc.useContext();
  const followMutation = trpc.user.follow.useMutation({
    onSuccess: () => {
      utils.user.getUserByUsername.invalidate();
      utils.user.getUserByUserId.invalidate();
    },
  });
  const unfollowMutation = trpc.user.unfollow.useMutation({
    onSuccess: () => {
      utils.user.getUserByUsername.invalidate();
      utils.user.getUserByUserId.invalidate();
    },
  });

  return (
    <div className="">
      {isFollowing ? (
        <>
          {isHovering ? (
            <button
              onClick={() =>
                unfollowMutation.mutate({
                  followerUserId: loggedInUserId,
                  followingUserId: profileUserId,
                })
              }
              className="border p-2 px-4 rounded-3xl border-red-600 text-red-600 font-semibold"
              onMouseOver={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="border p-2 px-4 rounded-3xl  border-slate-300 font-semibold"
              onMouseOver={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Following
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() =>
            followMutation.mutate({
              followerUserId: loggedInUserId,
              followingUserId: profileUserId,
            })
          }
          className="border p-2 px-4 rounded-3xl border-slate-300 font-semibold"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
