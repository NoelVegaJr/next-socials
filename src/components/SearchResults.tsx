import * as React from "react";
import { trpc } from "../lib/trpc";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

interface ISearchResultsProps {
  search: string;
  userId: string;
}

const SearchResults: React.FunctionComponent<ISearchResultsProps> = ({
  search,
  userId,
}) => {
  const { data: users } = trpc.user.getUsersByUsername.useQuery({
    username: search,
  });

  const followMutation = trpc.user.follow.useMutation();

  return (
    <ul className="border w-full bg-white absolute rounded-lg py-1 px-4">
      {users?.map((user) => {
        return (
          <li
            className="list-none flex items-center justify-between gap-4"
            key={user.id}
          >
            <Link href={`${user.username}`}>
              <div className="flex items-center gap-4">
                <Avatar src={user.image} className="w-10 h-10" />
                {user.username}
              </div>
            </Link>
            <FontAwesomeIcon
              onClick={() =>
                followMutation.mutate({
                  followerUserId: userId,
                  followingUserId: user.id,
                })
              }
              icon={faPlusSquare}
              className="cursor-pointer"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
