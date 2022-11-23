import * as React from "react";

interface IFriendsListProps {}

const FriendsList: React.FunctionComponent<IFriendsListProps> = (props) => {
  return (
    <div className="bg-white">
      <p className="font-semibold">Friend List</p>
      <ul></ul>
    </div>
  );
};

export default FriendsList;
