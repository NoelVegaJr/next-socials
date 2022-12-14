import {
  faCheck,
  faEnvelope,
  faPlus,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { FormEvent, useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import ChatFeed from "./ChatFeed";
import Conversations from "./Conversations";
import Modal from "./Modal";
import { UserContext } from "../context/user-context";

import { trpc } from "../lib/trpc";
import { MessagesContext } from "../context/messages-context";

interface IMessagesPageProps {}

const MessagesPage: React.FunctionComponent<IMessagesPageProps> = ({}) => {
  const userCtx = useContext(UserContext);
  const msgsCtx = useContext(MessagesContext);
  const [usersInNewConvo, setUsersInNewConvo] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openNewConvoModal, setOpenNewConvoModal] = useState(false);
  const [openConversation, setOpenConversation] = useState<any>();
  const { data: users, refetch } = trpc.user.getUsersByUsername.useQuery(
    {
      username: searchText,
    },
    { enabled: false }
  );
  const newConversationMutation = trpc.messenger.newConversation.useMutation();
  const getConversationsQuery =
    trpc.messenger.getConversationsByUserId.useQuery({
      userId: userCtx.id,
    });

  const handleChange = async (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (getConversationsQuery.data) {
      setOpenConversation(getConversationsQuery.data[0]);
    }
  }, [getConversationsQuery.data?.length]);

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
      creatorId: userCtx.id,
      userIds: [...usersInNewConvo.map((u) => u.id), userCtx.id],
    });
  };

  return (
    <>
      <div className="min-h-screen w-full  flex">
        {/* <SideNav /> */}
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
              <Conversations
                active={openConversation}
                openConversation={(conversation: any) =>
                  setOpenConversation(conversation)
                }
                conversations={msgsCtx ?? []}
              />
            </div>
          </div>
        </div>
        <ChatFeed conversation={openConversation} user={userCtx} />
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

export default MessagesPage;
