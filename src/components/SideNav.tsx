import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faBell,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import NewPostModalForm from "./NewPostModalForm";

interface ISideNavProps {
  username: string;
  userId: string;
}

const SideNav: React.FunctionComponent<ISideNavProps> = ({
  username,
  userId,
}: ISideNavProps) => {
  const [newPost, setNewPost] = useState(false);
  return (
    <>
      <nav className="h-screen p-8  border-r-2 ">
        <ul className="flex flex-col items-center gap-8">
          <li>
            <Link href="/">
              <p className="text-blue-600 font-bold text-3xl">CF</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <button className="h-14 w-14 hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </button>
            </Link>
          </li>
          <li>
            <button className="h-14 w-14 hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300">
              <FontAwesomeIcon icon={faBell} className="text-3xl" />
            </button>
          </li>
          <li>
            <button className="h-14 w-14 hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300">
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
            </button>
          </li>
          <li>
            <Link href={`/${username}`}>
              <button className="h-14 w-14 hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center">
                <FontAwesomeIcon icon={faUser} className="text-3xl" />
              </button>
            </Link>
          </li>
          <li>
            <button
              className="h-14 w-14 rounded-full bg-blue-400 hover:bg-blue-500 transition-all duration-300 flex justify-center items-center"
              onClick={() => {
                setNewPost(true);
              }}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-3xl text-white"
              />
            </button>
          </li>
        </ul>
      </nav>
      {newPost && (
        <Modal close={() => setNewPost(false)}>
          <NewPostModalForm userId={userId} />
        </Modal>
      )}
    </>
  );
};

export default SideNav;
