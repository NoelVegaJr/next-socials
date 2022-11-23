import * as React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

interface IModalProps {
  close: () => void;
  children: JSX.Element | JSX.Element[];
}

interface IBackDropProps {
  close: () => void;
  children: JSX.Element | JSX.Element[];
}

const BackDrop = ({ children, close }: IBackDropProps) => {
  return createPortal(
    <div
      onClick={(e) => {
        console.log("backdrop clicked");
        close();
      }}
      className="fixed h-screen w-full bg-slate-900/60 top-0 left-0 z-50 flex justify-center items-center border"
    >
      {children}
    </div>,
    document.getElementById("__next")!
  );
};

const Modal: React.FunctionComponent<IModalProps> = ({ close, children }) => {
  return (
    <BackDrop close={close}>
      <div onClick={(e) => e.stopPropagation()} className="max-w-md grow">
        {children}
      </div>
    </BackDrop>
  );
};

export default Modal;
