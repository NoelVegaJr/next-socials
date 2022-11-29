import * as React from "react";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../lib/trpc";
import { useContext, useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import { UserContext } from "../context/user-context";

interface INewPostFormProps {}

const NewPostForm: React.FunctionComponent<
  INewPostFormProps
> = ({}: INewPostFormProps) => {
  const userCtx = useContext(UserContext);

  const utils = trpc.useContext();
  const createPostMutation = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.getHomePosts.invalidate();
    },
  });

  const [text, setText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, text);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setText(val);
  };

  const handleCreatePost = () => {
    setText("");
    createPostMutation.mutate({ userId: userCtx.id, text });
  };

  return (
    <div className="bg-white h-fit flex flex-col p-4 gap-2 border-b-2 ">
      <div className=" flex  items-center gap-4 ">
        <Avatar src={userCtx.image} className="w-12 h-12 mb-2" />

        <textarea
          id="review-text"
          onChange={handleChange}
          placeholder="What's on your mind?"
          ref={textAreaRef}
          rows={1}
          value={text}
          className="grow outline-none resize-none"
        />
      </div>
      <div className="flex  justify-end gap-16 text-slate-400">
        <button
          onClick={handleCreatePost}
          className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-xl"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;
