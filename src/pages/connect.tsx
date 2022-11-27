import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import * as React from "react";
import Avatar from "../components/Avatar";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import { trpc } from "../lib/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

interface IConnectPageProps {
  authSession: Session;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  if (!session.user.username) {
    return {
      redirect: {
        permanent: false,
        destination: "/user-details",
      },
      props: {},
    };
  }

  return {
    props: {
      authSession: session,
    },
  };
}

const ConnectPage: React.FunctionComponent<IConnectPageProps> = ({
  authSession,
}) => {
  const utils = trpc.useContext();
  const userId = authSession?.user.id;

  const newConnections = trpc.user.listNewConnections.useQuery({
    userId,
    count: 100,
  });

  const followMutation = trpc.user.follow.useMutation({
    onSuccess: () => {
      utils.user.listNewConnections.invalidate();
    },
  });

  return (
    <div className="min-h-screen w-full  flex">
      {authSession && newConnections.data && (
        <>
          <SideNav userId={userId} username={authSession?.user.username} />
          <div className="flex flex-col grow border-r-2 ">
            <div className="flex items-center gap-10 py-6  px-4 ">
              <button className="h-8 w-8 hover:bg-slate-200 rounded-full transition-all ease-in-out duration-300 grid place-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>

              <p className="font-bold text-xl ">Connect</p>
            </div>

            {newConnections.data.length > 0 && (
              <ul className="flex flex-col gap-6 mb-8 py-4">
                {newConnections.data.map((conn: any) => {
                  return (
                    <li key={conn.id} className="px-4 ">
                      <div className="flex gap-2">
                        <Avatar src={conn.image} className="w-12 h-12" />
                        <div className="flex flex-col grow">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{conn.name}</p>
                              <p className="-mt-1">@{conn.username}</p>
                            </div>

                            <button
                              onClick={() =>
                                followMutation.mutate({
                                  followerUserId: userId,
                                  followingUserId: conn.id,
                                })
                              }
                              className="bg-black text-white px-4 py-1  h-fit rounded-2xl"
                            >
                              Follow
                            </button>
                          </div>
                          {<p>{conn.bio}</p>}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="flex flex-col px-4">
            <SearchBar userId={userId} />
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectPage;
