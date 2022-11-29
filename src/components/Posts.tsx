import * as React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/user-context";
import { trpc } from "../lib/trpc";
import Post from "./Post";

interface IPostsProps {
  posts: any;
}

const Posts: React.FunctionComponent<IPostsProps> = ({
  posts,
}: IPostsProps) => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <ul className="flex flex-col gap-4">
        {posts?.map((post: any) => {
          return (
            <li key={post.id}>
              <Post
                id={post.id}
                name={post.user.name}
                username={post.user.username}
                image={post.user.image}
                userId={userCtx.id}
                text={post.text}
                date={post.date}
                likes={post.likes}
                comments={post.comments}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Posts;
