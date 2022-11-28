import {
  faCheck,
  faEnvelope,
  faPaperPlane,
  faPlus,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import * as React from "react";
import { FormEvent, useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Conversations from "../components/Conversations";
import Modal from "../components/Modal";
import SideNav from "../components/SideNav";
import { dateFormatter } from "../lib/dateFormatter";
import { pusherClient } from "../lib/pusher";
import { trpc } from "../lib/trpc";

interface IMessagesPageProps {
  authSession: Session;
}

const MessagesPage: React.FunctionComponent<IMessagesPageProps> = ({
  authSession,
}) => {
  const [usersInNewConvo, setUsersInNewConvo] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openNewConvoModal, setOpenNewConvoModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const newMessage = trpc.messenger.push.useMutation();
  const { data: users, refetch } = trpc.user.getUsersByUsername.useQuery(
    {
      username: searchText,
    },
    { enabled: false }
  );
  const newConversationMutation = trpc.messenger.newConversation.useMutation();

  const handleChange = async (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    const handler = setTimeout(async () => {
      // handleChange(searchValue);
      handleChange(searchText);
      await refetch();

      console.log(searchText);
      console.log(users);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    const channel = pusherClient.subscribe("1");
    channel.bind("new-message", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      pusherClient.unsubscribe("1");
    };
  }, []);

  const handleSubmitMsg = async () => {
    if (!msg) return;
    if (authSession.user.image) {
      newMessage.mutate({
        msg,
        conversationId: "1",
        userId: authSession.user.id,
        date: new Date().toString(),
        avatarUrl: authSession.user.image,
      });
    }
    setMsg("");
  };

  const handleUsersInConvo = (selectedUser: any) => {
    console.log(selectedUser);
    const exists = usersInNewConvo.find((u: any) => u.id === selectedUser.id);
    if (exists) {
      console.log("exists");
      setUsersInNewConvo((prev) => [
        ...prev.filter((u) => u.id != selectedUser.id),
      ]);
    } else {
      setUsersInNewConvo((prev) => [...prev, selectedUser]);
    }
  };

  const handleCreateConvo = () => {
    newConversationMutation.mutate({
      creatorId: authSession.user.id,
      userIds: usersInNewConvo.map((u) => u.id),
    });
  };

  return (
    <>
      <div className="min-h-screen w-full  flex">
        <SideNav
          userId={authSession?.user.id}
          username={authSession?.user.username}
        />
        <div>
          <div className="border-r h-full w-96">
            <div className=" px-4 py-4 flex justify-between items-center">
              <p className="text-xl font-bold">Messages</p>
              <button
                onClick={() => setOpenNewConvoModal(true)}
                className="w-12 h-12 hover:bg-slate-200 rounded-full transition-all duration-300"
              >
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                  <div className="absolute top-2.5 right-2 w-4 h-4 grid place-content-center bg-white rounded-full">
                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                  </div>
                </div>
              </button>
            </div>
            <div className="px-4">
              <div className=" border rounded-2xl p-2 px-4 flex gap-2 items-center mb-4">
                <FontAwesomeIcon icon={faSearch} />
                <input
                  type="text"
                  placeholder="Search Direct Messages"
                  className="outline-none"
                />
              </div>
            </div>
            <div className="">
              <Conversations />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="grow">
            <ul className="flex flex-col gap-4 p-4">
              {messages.map((m) => {
                return (
                  <li
                    key={m.msg}
                    className={`flex ${
                      m.userId === authSession.user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="flex gap-2 w-fit">
                      {m.userId !== authSession.user.id && (
                        <Avatar src={m.avatarUrl} className="w-12 h-12" />
                      )}
                      <div>
                        <div className="w-fit bg-blue-500 px-2 py-1 rounded-lg text-white">
                          <p>{m.msg}</p>
                        </div>
                        <p className="text-xs">{dateFormatter(m.date)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="px-4 py-2 pb-4 border-t flex items-center ">
            <input
              type="text"
              placeholder="Start a new message"
              className=" w-full rounded-l-2xl py-3 px-4 bg-slate-100  placeholder-slate-500 outline-none "
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSubmitMsg()}
            />
            <button
              onClick={handleSubmitMsg}
              className="rounded-r-xl py-3 px-4 bg-slate-100"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-blue-400 " />
            </button>
          </div>
        </div>
      </div>
      {openNewConvoModal && (
        <Modal close={() => setOpenNewConvoModal(false)}>
          <div className="bg-white rounded-xl overflow-hidden pb-8">
            <div className="flex justify-between p-4">
              <div className="flex items-center gap-8 ">
                <FontAwesomeIcon icon={faX} className="text-slate-600" />
                <p className="font-bold text-lg">New Message</p>
              </div>
              <button
                onClick={handleCreateConvo}
                className={`${
                  usersInNewConvo.length > 0 ? "bg-black" : "bg-black/30"
                }  px-4 rounded-2xl text-white font-semibold`}
              >
                Create
              </button>
            </div>

            <div className="w-full bg-white flex flex-col mb-1 border-b pb-2">
              <div className="py-1  px-4  flex gap-6 items-center w-full  ">
                <FontAwesomeIcon
                  icon={faSearch}
                  className={`${
                    isSearchFocused && "text-blue-500"
                  } transition-all duration-300`}
                />
                <input
                  type="text"
                  className="outline-none w-full"
                  placeholder="Search People"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <ul className="flex flex-wrap px-2 gap-2 mt-4">
                {usersInNewConvo.map((user) => {
                  return (
                    <li
                      onClick={() => handleUsersInConvo(user)}
                      key={user.id}
                      className="cursor-pointer hover:bg-blue-50 flex justify-between border rounded-2xl p-1 items-center gap-4 pr-2 w-fit"
                    >
                      <div className="flex gap-2 items-center">
                        <Avatar src={user.image} className="w-4 h-4" />
                        <p className="font-semibold text-sm">{user.name}</p>
                      </div>
                      <FontAwesomeIcon icon={faX} className="text-xs" />
                    </li>
                  );
                })}
              </ul>
            </div>
            {users && users.length > 0 && (
              <ul className="flex flex-col">
                {users.map((user) => {
                  return (
                    <li
                      onClick={() => handleUsersInConvo(user)}
                      key={user.id}
                      className="px-4 py-4 hover:bg-slate-100 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                          <Avatar src={user.image} className="w-10 h-10" />
                          <div>
                            <p>{user.name}</p>
                            <p className="-mt-2">@{user.username}</p>
                          </div>
                        </div>
                        {usersInNewConvo.find((u: any) => u.id === user.id) && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-blue-400"
                          />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

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

export default MessagesPage;
