import * as React from "react";
import Avatar from "./Avatar";
import { trpc } from "../lib/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faMessage,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import ReplyModal from "./ReplyModal";
import Modal from "./Modal";

interface IPostProps {
  id: string;
  text: string;
  date: string;
  likes: { id: string; postId: string; userId: string }[];
  userId: string;
}

const Post: React.FunctionComponent<IPostProps> = ({
  id,
  text,
  date,
  likes,
  userId,
}: IPostProps) => {
  const utils = trpc.useContext();
  const likeMutation = trpc.post.like.useMutation({
    onSuccess: () => {
      utils.post.getPostsByUserId.invalidate();
    },
  });
  const unlikeMutation = trpc.post.unlike.useMutation({
    onSuccess: () => {
      utils.post.getPostsByUserId.invalidate();
    },
  });

  const [isReplying, setIsReplying] = useState<boolean>(false);

  const currentDate = new Date().getTime();
  const postDate = new Date(date).getTime();
  const minutesSincePosted = (currentDate - postDate) / 60000;

  likes.find((like) => like.userId === userId);

  const handleLikePost = () => {
    const like = likes.find((like) => like.userId === userId);
    if (!like) {
      // like
      likeMutation.mutate({ postId: id, userId });
    } else {
      // unlike
      unlikeMutation.mutate({ likeId: like.id });
    }
  };
  return (
    <>
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4">
        <div className="flex items-center gap-4 font-semibold">
          <Avatar className="w-14 h-14" />
          <p>Noel Vega</p>

          {minutesSincePosted >= 1 && minutesSincePosted < 60 && (
            <p className="text-xs"> {Math.round(minutesSincePosted)} min ago</p>
          )}
          {minutesSincePosted < 1 && (
            <p className="text-xs">
              {" "}
              {Math.round((currentDate - postDate) / 1000)} secs ago
            </p>
          )}
        </div>
        <p>{text}</p>
        {/* <div className="w-full h-72 relative rounded-lg overflow-hidden">
        <Image
          src="/Image-1.jfif"
          alt="post image"
          className=""
          layout="fill"
          objectFit="cover"
        />
      </div> */}
        <hr />
        <div className="flex justify-evenly text-slate-400">
          <button className="flex gap-4 items-center" onClick={handleLikePost}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`${
                likes.find((like) => like.userId === userId) && "text-red-600"
              } stroke-red-600 hover:text-red-600 transition-all duration-200`}
            />
            {likes.length > 0 && likes.length}
          </button>
          <button
            className="flex gap-4 items-center"
            onClick={() => setIsReplying(!isReplying)}
          >
            <FontAwesomeIcon icon={faMessage} />
          </button>
          <button className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faShare} />
            Share
          </button>
        </div>
        {/* <div className="flex items-center gap-6 w-full">
        <Avatar className="w-10 h-10" />
        <input
          type="text"
          placeholder="Write a comment..."
          className="outline-none border px-2 py-1 rounded-xl grow"
        />
      </div> */}
        {isReplying && (
          <div className="flex items-center gap-6 w-full">
            <input
              type="text"
              placeholder="Write a comment..."
              className="outline-none border px-2 py-1 rounded-xl grow"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
