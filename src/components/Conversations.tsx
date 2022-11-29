import * as React from "react";
import { useState } from "react";
import { dateFormatter } from "../lib/dateFormatter";
import Avatar from "./Avatar";

interface IConversationsProps {
  conversations: any[];
  openConversation: (conversation: any) => void;
  active: any;
}

const Conversations: React.FunctionComponent<IConversationsProps> = ({
  conversations,
  openConversation,
  active,
}) => {
  return (
    <ul className="flex flex-col ">
      {conversations &&
        conversations.map((conversation) => {
          return (
            <li
              onClick={() => {
                openConversation(conversation);
              }}
              key={conversation.id}
              className={`cursor-pointer hover:bg-slate-100 py-4 ${
                active?.id === conversation.id && "border-r border-r-blue-500"
              }`}
            >
              <div className="px-4 flex gap-4">
                {conversation.messages.length === 0 ? (
                  <Avatar
                    src={
                      conversation.participants.find(
                        (p: any) => p.creator === true
                      )?.user.image
                    }
                    className="w-10 h-10"
                  />
                ) : (
                  <Avatar
                    src={conversation.messages[0].sender.image}
                    className="w-10 h-10"
                  />
                )}
                <div>
                  <p className="flex gap-2 items-center">
                    <span className="font-semibold">Noel Vega</span>{" "}
                    <span className="text-sm text-slate-600">
                      @
                      {conversation.messages.length === 0
                        ? conversation.participants.find(
                            (p: any) => p.creator === true
                          )?.user.username
                        : conversation.messages[0].sender.username}
                    </span>
                    <span className="text-slate-600 text-sm">
                      {conversation.messages.length === 0
                        ? dateFormatter(conversation.dateCreated)
                        : dateFormatter(conversation.messages[0].date)}
                    </span>
                  </p>
                  <p className="text-slate-600">
                    {conversation.messages.length === 0
                      ? "No messages"
                      : conversation.messages[0].text}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Conversations;
