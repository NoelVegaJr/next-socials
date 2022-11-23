import * as React from "react";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faImage,
  faPaperclip,
  faFileAudio,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

interface INewPostFormProps {}

const NewPostForm: React.FunctionComponent<INewPostFormProps> = (props) => {
  return (
    <div className="bg-white rounded-lg grow h-fit flex flex-col p-4 gap-4">
      <div className="flex w-full items-center gap-4 ">
        <Avatar className="w-16 h-16" />
        <input
          type="text"
          className="outline-none border rounded-xl px-2 py-1 w-full h-fit"
          placeholder="What's on your mind..."
        />
      </div>
      <hr />
      <div className="flex  justify-between gap-16 text-slate-400">
        <div className="flex gap-10">
          <button className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faImage} /> Image
          </button>
          <button className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faPaperclip} />
            Attachment
          </button>
        </div>
        <button className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-xl">
          POST
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;
