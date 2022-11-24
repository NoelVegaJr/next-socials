import * as React from "react";
import { useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import { trpc } from "../lib/trpc";

interface INewCommentFormProps {
  postId: string;
  userId: string;
  close: () => void;
}

const NewCommentForm: React.FunctionComponent<INewCommentFormProps> = ({
  postId,
  userId,
  close,
}) => {
  const utils = trpc.useContext();
  const newCommentMutation = trpc.post.newComment.useMutation({
    onSuccess: () => {
      utils.post.getPostsByUserId.invalidate();
    },
  });
  const [text, setText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, text);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setText(val);
  };

  const handleNewComment = () => {
    newCommentMutation.mutate({ postId, userId, text });
    setText("");
    close();
  };

  return (
    <div className="w-full">
      <textarea
        id="review-text"
        onChange={handleChange}
        placeholder="Write a comment..."
        ref={textAreaRef}
        rows={1}
        value={text}
        className="w-full outline-none resize-none border rounded-lg p-1 overflow-hidden"
      />
      <div className="flex justify-end">
        <button
          onClick={handleNewComment}
          className="w-fit right-0 bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default NewCommentForm;
