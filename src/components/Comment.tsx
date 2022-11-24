import * as React from "react";
import { dateFormatter } from "../lib/dateFormatter";
import Avatar from "./Avatar";

interface ICommentProps {
  avatarSrc: string;
  username: string;
  text: string;
  date: string;
}

const Comment: React.FunctionComponent<ICommentProps> = ({
  avatarSrc,
  username,
  text,
  date,
}: ICommentProps) => {
  return (
    <div>
      <div className="flex gap-2">
        <Avatar className="w-8 h-8 self-start" />
        <div>
          <div className="flex items-center gap-4">
            <p>{username}</p>
            <p className="text-xs">{dateFormatter(new Date(date).getTime())}</p>
          </div>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
