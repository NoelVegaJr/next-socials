import * as React from "react";
import Avatar from "./Avatar";

interface IConversationsProps {}

const Conversations: React.FunctionComponent<IConversationsProps> = (props) => {
  return (
    <ul className="flex flex-col ">
      <li className="border-b py-4">
        <div className="px-4 flex gap-4">
          <Avatar src="/profile.jpg" className="w-10 h-10" />
          <div>
            <p>
              <span className="font-semibold">Noel Vega</span>{" "}
              <span className="text-sm text-slate-600">@codeforkdev</span>{" "}
              <span className="text-slate-600">Nov 26</span>
            </p>
            <p className="text-slate-600">My first message</p>
          </div>
        </div>
      </li>
      <li className="border-b py-4">
        <div className="px-4 flex gap-4">
          <Avatar src="/profile.jpg" className="w-10 h-10" />
          <div>
            <p>
              <span className="font-semibold">Noel Vega</span>{" "}
              <span className="text-sm text-slate-600">@codeforkdev</span>{" "}
              <span className="text-slate-600">Nov 26</span>
            </p>
            <p className="text-slate-600">My first message</p>
          </div>
        </div>
      </li>
      <li className="border-b py-4">
        <div className="px-4 flex gap-4">
          <Avatar src="/profile.jpg" className="w-10 h-10" />
          <div>
            <p>
              <span className="font-semibold">Noel Vega</span>{" "}
              <span className="text-sm text-slate-600">@codeforkdev</span>{" "}
              <span className="text-slate-600">Nov 26</span>
            </p>
            <p className="text-slate-600">My first message</p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Conversations;
