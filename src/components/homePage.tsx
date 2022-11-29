import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../context/user-context";
import { trpc } from "../lib/trpc";
import ConnectWithBox from "./ConnectWithBox";
import NewPostForm from "./NewPostForm";
import Posts from "./Posts";
import SearchBar from "./SearchBar";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const userCtx = useContext(UserContext);

  const posts = trpc.post.getHomePosts.useQuery({ userId: userCtx.id });
  const newConnections = trpc.user.listNewConnections.useQuery({
    userId: userCtx.id,
    count: 3,
  });
  return (
    <>
      <div className="flex flex-col  grow border-r-2">
        <p className="font-bold text-xl p-4">Home</p>

        <NewPostForm />
        {posts.data && <Posts posts={posts.data} />}
      </div>
      <div className="flex flex-col px-4">
        <SearchBar />
        {newConnections.data && newConnections.data.length > 0 && (
          <ConnectWithBox
            connections={newConnections.data}
            userId={userCtx.id}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
