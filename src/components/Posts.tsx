import * as React from "react";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import Post from "./Post";

interface IPostsProps {
  userId: string;
}

const Posts: React.FunctionComponent<IPostsProps> = ({
  userId,
}: IPostsProps) => {
  const getPosts = trpc.post.getPostsByUserId.useQuery({
    userId,
  });
  const [posts, setPosts] = useState<any[]>();

  React.useEffect(() => {
    if (getPosts.data) {
      setPosts(getPosts.data);
    }
  }, [getPosts.data]);

  return (
    <>
      <ul className="flex flex-col gap-4">
        {posts?.map((post) => {
          return (
            <li key={post.id}>
              <Post
                id={post.id}
                text={post.text}
                date={post.date}
                likes={post.likes}
                userId={userId}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Posts;
