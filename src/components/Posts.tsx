import * as React from "react";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import Post from "./Post";

interface IPostsProps {
  userId: string;
  posts: any;
}

const Posts: React.FunctionComponent<IPostsProps> = ({
  userId,
  posts,
}: IPostsProps) => {
  // const getPosts = trpc.post.getPostsByUserId.useQuery({
  //   userId,
  // });

  // const getPosts = trpc.post.getHomePosts.useQuery({
  //   userId,
  //   posts
  // });
  // const [posts, setPosts] = useState<any[]>();

  // React.useEffect(() => {
  //   if (getPosts.data) {
  //     setPosts(getPosts.data as any[]);
  //   }
  // }, [getPosts.data]);
  // console.log(posts);
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
                userId={userId}
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
