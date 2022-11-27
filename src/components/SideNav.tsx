import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faBell,
} from "@fortawesome/free-regular-svg-icons";

import Link from "next/link";

interface ISideNavProps {
  username: string;
}

const SideNav: React.FunctionComponent<ISideNavProps> = ({
  username,
}: ISideNavProps) => {
  return (
    <nav className="h-screen p-8  border-r-2 ">
      <ul className="flex flex-col items-center gap-8">
        <li>
          <Link href="/">
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
          </Link>
        </li>
        <li>
          <button>
            <FontAwesomeIcon icon={faBell} className="text-3xl" />
          </button>
        </li>
        <li>
          <button>
            <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
          </button>
        </li>
        <li>
          <Link href={`/${username}`}>
            <FontAwesomeIcon icon={faUser} className="text-3xl" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
