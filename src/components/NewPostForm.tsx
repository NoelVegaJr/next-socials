import * as React from "react";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../lib/trpc";
import { useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";

interface INewPostFormProps {
  userId: string;
  avatarSrc?: string | null;
}

const NewPostForm: React.FunctionComponent<INewPostFormProps> = ({
  userId,
  avatarSrc,
}: INewPostFormProps) => {
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
    createPostMutation.mutate({ userId, text });
  };

  return (
    <div className="bg-white rounded-lg grow h-fit flex flex-col p-4 gap-2">
      <div className="w-full flex flex-wrap items-center gap-4 ">
        <Avatar src={avatarSrc} className="w-12 h-12 mb-2" />

        <textarea
          id="review-text"
          onChange={handleChange}
          placeholder="What's on your mind?"
          ref={textAreaRef}
          rows={1}
          value={text}
          className="w-full outline-none resize-none"
        />
      </div>
      <hr />
      <div className="flex  justify-between gap-16 text-slate-400">
        <div className="flex gap-10">
          <button className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faImage} /> Image
          </button>
          {/* <button className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faPaperclip} />
            Attachment
          </button> */}
        </div>
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
