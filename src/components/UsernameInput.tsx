import * as React from "react";
import { trpc } from "../lib/trpc";

interface IUsernameInputProps {
  isValid: boolean;
  username: string;
  //   onChange: (text: string) => void;
}

const UsernameInput: React.FunctionComponent<IUsernameInputProps> = ({
  isValid,
  username,
}: //   onChange,
IUsernameInputProps) => {
  const usernameExists = trpc.user.usernameExists.useQuery({ username });
  console.log(usernameExists);

  return (
    <input
      type="text"
      placeholder="username"
      className={`outline-none border-r border-y ${
        !isValid && "border-r-red-600 border-y-red-600"
      }  w-full rounded-r p-1`}
      value={username}
      // onChange={(e) => handleChange(e.target.value)}
      //   onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default UsernameInput;
