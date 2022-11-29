import * as React from "react";
import { trpc } from "../lib/trpc";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/user-context";

interface ISearchResultsProps {
  search: string;
}

const SearchResults: React.FunctionComponent<ISearchResultsProps> = ({
  search,
}) => {
  const userCtx = useContext(UserContext);

  const { data: searchedUsers } = trpc.user.getUsersByUsername.useQuery({
    username: search,
  });

  const followMutation = trpc.user.follow.useMutation();

  return (
    <ul className="border w-full bg-white absolute rounded-lg py-1 px-4">
      {searchedUsers?.map((searchedUser) => {
        return (
          <li
            className="list-none flex items-center justify-between gap-4"
            key={searchedUser.id}
          >
            <Link href={`${searchedUser.username}`}>
              <div className="flex items-center gap-4">
                <Avatar src={searchedUser.image} className="w-10 h-10" />
                {searchedUser.username}
              </div>
            </Link>
            <FontAwesomeIcon
              onClick={() =>
                followMutation.mutate({
                  followerUserId: userCtx.id,
                  followingUserId: searchedUser.id,
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
