import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faBell,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

import Link from "next/link";
import { useContext, useState } from "react";
import Modal from "./Modal";
import NewPostModalForm from "./NewPostModalForm";
import { UserContext } from "../context/user-context";
import { ViewContext } from "../context/view-context";

interface ISideNavProps {}

const SideNav: React.FunctionComponent<ISideNavProps> = ({}: ISideNavProps) => {
  const userCtx = useContext(UserContext);
  const viewCtx = useContext(ViewContext);
  const [newPost, setNewPost] = useState(false);
  return (
    <>
      <nav className="h-screen p-8  border-r-2 ">
        <ul className="flex flex-col  gap-8">
          <li>
            <p
              onClick={() => viewCtx.setView("home")}
              className="text-blue-600 font-bold text-3xl cursor-pointer"
            >
              CF
            </p>
          </li>
          <li>
            <button
              onClick={() => viewCtx.setView("home")}
              className="h-14 w-14 lg:h-fit lg:w-fit lg:flex lg:px-4 lg:py-2 lg:gap-4 items-center text-xl hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center"
            >
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
              <p className="hidden lg:block">Home</p>
            </button>
          </li>
          <li className="flex items-center text-xl">
            <button className="h-14 w-14 lg:h-fit lg:w-fit lg:flex lg:px-4 lg:py-2 lg:gap-4 items-center text-xl hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center">
              <FontAwesomeIcon icon={faBell} className="text-3xl" />
              <p className="hidden lg:block">Notifications</p>
            </button>
          </li>
          {/* <li>
            <Link href={`/messages`} className="flex items-center text-xl">
              <button className="h-14 w-14 lg:h-fit lg:w-fit lg:flex lg:px-4 lg:py-2 lg:gap-4 items-center text-xl hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
                <p className="hidden lg:block">Messages</p>
              </button>
            </Link>
          </li> */}
          <li>
            <div className="flex items-center text-xl">
              <button
                onClick={() => viewCtx.setView("messages")}
                className="h-14 w-14 lg:h-fit lg:w-fit lg:flex lg:px-4 lg:py-2 lg:gap-4 items-center text-xl hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
                <p className="hidden lg:block">Messages</p>
              </button>
            </div>
          </li>
          <li>
            {/* <Link
              href={`/${userCtx.username}`}
              className="flex items-center text-xl"
            >
              <button className="h-14 w-14 lg:h-fit lg:w-fit lg:flex lg:px-4 lg:py-2 lg:gap-4 items-center text-xl hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center">
                <FontAwesomeIcon icon={faUser} className="text-3xl" />
                <p className="hidden lg:block">Profile</p>
              </button>
            </Link> */}

            <button
              onClick={() => viewCtx.setView(userCtx.username)}
              className="h-14 w-14 lg:h-fit lg:w-fit lg:flex lg:px-4 lg:py-2 lg:gap-4 items-center text-xl hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center"
            >
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
              <p className="hidden lg:block">Profile</p>
            </button>
          </li>
          <li className="flex items-center text-xl">
            <button
              className="h-14 w-14 lg:w-full lg:h-12 rounded-full bg-blue-400 hover:bg-blue-500 transition-all duration-300 flex justify-center items-center"
              onClick={() => {
                setNewPost(true);
              }}
            >
              <div className="lg:hidden">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-3xl text-white "
                />
              </div>
              <p className="hidden text-white lg:flex lg:gap-4 lg:items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                New Post
              </p>
            </button>
          </li>
        </ul>
      </nav>
      {newPost && (
        <Modal close={() => setNewPost(false)}>
          <NewPostModalForm />
        </Modal>
      )}
    </>
  );
};

export default SideNav;
