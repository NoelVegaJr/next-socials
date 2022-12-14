import Link from "next/link";
import * as React from "react";
import { dateFormatter } from "../lib/dateFormatter";
import Avatar from "./Avatar";

interface ICommentProps {
  image: string;
  name: string;
  username: string;
  text: string;
  date: string;
}

const Comment: React.FunctionComponent<ICommentProps> = ({
  image,
  name,
  username,
  text,
  date,
}: ICommentProps) => {
  return (
    <div>
      <div className="flex gap-2">
        <Avatar src={image} className="w-8 h-8 self-start" />
        <div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Link href={`${username}`}>{name}</Link>
                <p className="text-xs">
                  {dateFormatter(new Date(date).getTime())}
                </p>
              </div>
              <Link href={`${username}`} className="text-xs">
                @{username}
              </Link>
            </div>
          </div>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
