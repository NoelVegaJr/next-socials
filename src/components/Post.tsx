import * as React from "react";
import Avatar from "./Avatar";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faMessage,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

interface IPostProps {
  text: string;
}

const Post: React.FunctionComponent<IPostProps> = ({ text }: IPostProps) => {
  return (
    <div className="bg-white p-8 rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-4 font-semibold">
        <Avatar className="w-14 h-14" />
        <p>Noel Vega</p>
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
        <button className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faThumbsUp} /> Like
        </button>
        {/* <button className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faMessage} />
          Comment
        </button> */}
        <button className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faShare} />
          Share
        </button>
      </div>
      <div className="flex items-center gap-6 w-full">
        <Avatar className="w-10 h-10" />
        <input
          type="text"
          placeholder="Write a comment..."
          className="outline-none border px-2 py-1 rounded-xl grow"
        />
      </div>
    </div>
  );
};

export default Post;
