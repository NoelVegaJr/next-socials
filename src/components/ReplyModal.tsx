import * as React from "react";
import Modal from "./Modal";

interface IReplyModalProps {
  close: () => void;
}

const ReplyModal: React.FunctionComponent<IReplyModalProps> = (props) => {
  return (
    <Modal close={() => close()}>
      <div className="w-52 h-52 bg-red-500"></div>
    </Modal>
  );
};

export default ReplyModal;
