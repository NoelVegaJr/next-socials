import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useEffect, useState } from "react";
import { dateFormatter } from "../lib/dateFormatter";
import { pusherClient } from "../lib/pusher";
import Avatar from "./Avatar";
import { trpc } from "../lib/trpc";
import { Button, Tooltip } from "@nextui-org/react";

interface IChatFeedProps {
  user: any;
  conversation: any;
}

const ChatFeed: React.FunctionComponent<IChatFeedProps> = ({
  user,
  conversation,
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>(conversation?.messages);
  const newMessage = trpc.messenger.push.useMutation();

  useEffect(() => {
    setMessages(
      conversation?.messages ? [...conversation.messages].reverse() : []
    );
  }, [conversation?.id]);

  useEffect(() => {
    const channel = pusherClient.subscribe(conversation?.id ?? "");
    channel.bind("new-message", (msg: any) => {
      console.log("new message");
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      pusherClient.unsubscribe(conversation?.id);
    };
  }, [conversation?.id]);

  const handleSubmitMsg = async () => {
    if (!text) return;
    if (user.image) {
      newMessage.mutate({
        text,
        conversationId: conversation.id,
        userId: user.id,
        date: new Date().toString(),
        image: user.image,
      });
    }
    setText("");
  };
  return (
    <div className="flex flex-col w-full h-screen border">
      <div className=" bg-slate-100 p-10 flex flex-col gap-4">
        <p className="text-center text-sm">
          Chat started: {dateFormatter(conversation?.dateCreated)}
        </p>
        <ul className="flex justify-center gap-4">
          {conversation?.participants.map((p: any) => {
            return (
              <Tooltip key={p.id} content={`@${p.user.username}`}>
                <li>{<Avatar src={p.user.image} className="w-8 h-8" />}</li>
              </Tooltip>
            );
          })}
        </ul>
      </div>
      <div className="grow overflow-y-scroll">
        <ul className="flex flex-col gap-4 p-4">
          {messages?.map((m) => {
            return (
              <li
                key={m.id}
                className={`flex ${
                  m.userId === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex gap-2 w-fit">
                  {m.userId !== user.id && (
                    <Avatar src={m.sender.image} className="w-12 h-12" />
                  )}
                  <div>
                    <div className="w-fit bg-blue-500 px-2 py-1 rounded-lg text-white">
                      <p>{m.text}</p>
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
          value={text}
          onChange={(e) => setText(e.target.value)}
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
  );
};

export default ChatFeed;
