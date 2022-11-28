import Link from "next/link";
import * as React from "react";
import Avatar from "./Avatar";
import { trpc } from "../lib/trpc";

interface IConnectWithBoxProps {
  userId: string;
  connections: any[];
}

const ConnectWithBox: React.FunctionComponent<IConnectWithBoxProps> = ({
  userId,
  connections,
}) => {
  const utils = trpc.useContext();
  const followMutation = trpc.user.follow.useMutation({
    onSuccess: () => {
      utils.user.listNewConnections.invalidate();
    },
  });
  return (
    <div className="bg-slate-100 rounded-2xl p-4">
      <p className="font-bold mb-4 text-xl">New Connections</p>

      <ul className="flex flex-col gap-6 mb-8">
        {connections.map((conn: any) => {
          return (
            <li key={conn.id} className="flex justify-between items-center">
              <div className="flex gap-2">
                <Avatar src={conn.image} className="w-12 h-12" />
                <Link href={`${conn.username}`}>
                  <div>
                    <p className="font-semibold">{conn.name}</p>
                    <p className="-mt-1">@{conn.username}</p>
                  </div>
                </Link>
              </div>
              <button
                onClick={() =>
                  followMutation.mutate({
                    followerUserId: userId,
                    followingUserId: conn.id,
                  })
                }
                className="bg-black text-white px-4 py-1  h-fit rounded-2xl"
              >
                Follow
              </button>
            </li>
          );
        })}
      </ul>

      <Link href="/connect" className="text-blue-500">
        Show more
      </Link>
    </div>
  );
};

export default ConnectWithBox;
