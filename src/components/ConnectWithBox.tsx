import Link from "next/link";
import * as React from "react";
import Avatar from "./Avatar";

interface IConnectWithBoxProps {}

const ConnectWithBox: React.FunctionComponent<IConnectWithBoxProps> = (
  props
) => {
  return (
    <div className="bg-slate-100 rounded-2xl p-4">
      <p className="font-bold mb-4 text-xl">New Connections</p>
      <ul className="flex flex-col gap-6 mb-8">
        <li className="flex justify-between items-center">
          <div className="flex gap-2">
            <Avatar src={"/profile.jpg"} className="w-12 h-12" />
            <div>
              <p className="font-semibold">Noel</p>
              <p className="-mt-1">@codefork</p>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-1  h-fit rounded-2xl">
            Follow
          </button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex gap-2">
            <Avatar src={"/profile.jpg"} className="w-12 h-12" />
            <div>
              <p className="font-semibold">Noel</p>
              <p className="-mt-1">@codefork</p>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-1  h-fit rounded-2xl">
            Follow
          </button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex gap-2">
            <Avatar src={"/profile.jpg"} className="w-12 h-12" />
            <div>
              <p className="font-semibold">Noel</p>
              <p className="-mt-1">@codefork</p>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-1  h-fit rounded-2xl">
            Follow
          </button>
        </li>
      </ul>
      <Link href="/" className="text-blue-500">
        Show more
      </Link>
    </div>
  );
};

export default ConnectWithBox;
