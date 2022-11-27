import * as React from "react";
import Avatar from "./Avatar";
import { trpc } from "../lib/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faMessage,
  faShare,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import ReplyModal from "./ReplyModal";
import Modal from "./Modal";
import NewCommentForm from "./NewCommentForm";
import Comment from "../components/Comment";
import { dateFormatter } from "../lib/dateFormatter";

interface IPostProps {
  id: string;
  name: string;
  username: string;
  image: string;
  text: string;
  date: string;
  likes: { id: string; postId: string; userId: string }[];
  userId: string;
  comments: any[];
}

const Post: React.FunctionComponent<IPostProps> = ({
  id,
  name,
  username,
  image,
  text,
  date,
  likes,
  userId,
  comments,
}: IPostProps) => {
  const utils = trpc.useContext();
  const likeMutation = trpc.post.like.useMutation({
    onSuccess: () => {
      utils.post.getHomePosts.invalidate();
      utils.user.getUserByUsername.invalidate();
    },
  });
  const unlikeMutation = trpc.post.unlike.useMutation({
    onSuccess: () => {
      utils.post.getHomePosts.invalidate();
      utils.user.getUserByUsername.invalidate();
    },
  });

  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isViewingComments, setIsViewingComments] = useState<boolean>(false);
  // const currentDate = new Date().getTime();
  // const postDate = new Date(date).getTime();
  // const minutesSincePosted = (currentDate - postDate) / 60000;
  console.log(comments);
  likes?.find((like) => like.userId === userId);

  const handleLikePost = () => {
    const like = likes?.find((like) => like.userId === userId);
    if (!like) {
      // like
      likeMutation.mutate({ postId: id, userId });
    } else {
      // unlike
      unlikeMutation.mutate({ likeId: like.id });
    }
  };
  console.log(dateFormatter(new Date(date).getTime()));
  return (
    <>
      <div className="bg-white p-4  flex flex-col border-b">
        <div className="flex  gap-4 font-semibold pb-4">
          <Avatar src={image} className="w-12 h-12" />
          <div className="flex flex-col">
            <div className="flex gap-4 items-center">
              <p>{name}</p>
              <p className="text-xs">@{username}</p>
              <FontAwesomeIcon
                icon={faCircle}
                className="text-slate-400"
                width={4}
              />

              <p className="text-xs">
                {dateFormatter(new Date(date).getTime())}
              </p>
            </div>
            <p>{text}</p>
          </div>
        </div>
        <div className="flex justify-evenly text-slate-400">
          <button className="flex gap-4 items-center" onClick={handleLikePost}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`${
                likes?.find((like) => like.userId === userId) && "text-red-600"
              } stroke-red-600 hover:text-red-600 transition-all duration-200`}
            />
            {likes?.length > 0 && likes.length}
          </button>
          <div className="flex gap-4">
            <button
              className="flex gap-4 items-center"
              onClick={() => setIsReplying(!isReplying)}
            >
              <FontAwesomeIcon icon={faMessage} />
            </button>
            <button onClick={() => setIsViewingComments(!isViewingComments)}>
              {comments?.length > 0 && <p>{comments?.length}</p>}
            </button>
          </div>
          <button className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faShare} />
            Share
          </button>
        </div>
        {isReplying && (
          <div className="flex items-center gap-6 w-full">
            <NewCommentForm
              postId={id}
              userId={userId}
              close={() => setIsReplying(false)}
            />
          </div>
        )}
        {isViewingComments && (
          <ul className="flex flex-col gap-2 py-2">
            {comments?.map((comment) => {
              // return <li key={comment.id}>{comment.text}</li>;
              return (
                <li key={comment.id}>
                  <Comment
                    image={comment.user.image}
                    name={comment.user.name}
                    username={comment.user.username}
                    text={comment.text}
                    date={comment.date}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Post;
