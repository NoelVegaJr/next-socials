import * as React from "react";
import Navbar from "../components/NavBar";
import NewPostForm from "../components/NewPostForm";
import Posts from "../components/Posts";
import ProfileBox from "../components/ProfileBox";

interface IFeedProps {}

const Feed: React.FunctionComponent<IFeedProps> = (props) => {
  return (
    <div className="h-full w-full bg-slate-100">
      <Navbar />
      <div className="px-20 flex gap-8">
        <div>
          <ProfileBox />
          {/* <FriendsList /> */}
        </div>
        <div className="flex flex-col gap-4">
          <NewPostForm />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Feed;
