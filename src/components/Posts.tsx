import * as React from "react";
import Post from "./Post";

interface IPostsProps {}

const Posts: React.FunctionComponent<IPostsProps> = (props) => {
  return (
    <ul className="flex flex-col gap-4">
      <li>
        <Post />
      </li>
      <li>
        <Post />
      </li>
      <li>
        <Post />
      </li>
      <li>
        <Post />
      </li>
      <li>
        <Post />
      </li>
      <li>
        <Post />
      </li>
    </ul>
  );
};

export default Posts;
