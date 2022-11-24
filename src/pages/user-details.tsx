import * as React from "react";
import { useEffect, useState } from "react";
import { trpc } from "../lib/trpc";
import { Puff } from "react-loader-spinner";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import { Session } from "next-auth";

interface IUserNameFormProps {
  userId: string;
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

  if (!session || session.user.username) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      userId: session.user.id,
    },
  };
}

const UserNameForm: React.FunctionComponent<IUserNameFormProps> = ({
  userId,
}: IUserNameFormProps) => {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const updateUsernameMutation = trpc.user.updateUsername.useMutation();

  const { refetch } = trpc.user.usernameExists.useQuery({
    username,
  });

  const handleChange = async (text: string) => {
    setUsername((prev) => text);
    if (text === "") {
      setIsValid(null);
      return;
    }
    const regex = /^[a-zA-Z0-9]{1,33}$/;
    const result = regex.test(text);

    if (result) {
      setCheckingUsername(true);
      const { data: exists } = await refetch();
      setCheckingUsername(false);
      if (!exists) {
        setIsValid((prev) => true);
      } else {
        setIsValid((prev) => false);
      }
    } else {
      setIsValid((prev) => false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9]{1,33}$/;
    const result = regex.test(username);
    if (result) {
      updateUsernameMutation.mutate({ userId, username });
    } else {
      setIsValid((prev) => false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleChange(username);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [username]);

  return (
    <div className="h-screen w-full grid place-content-center bg-slate-50/50">
      <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-4">
        <p className="text-3xl font-bold">What should we call you?</p>
        <div className="flex items-center">
          <div
            className={`border ${isValid === false && "border-red-600"} ${
              isValid === true && "border-green-600"
            } p-1 rounded-l text-slate-400`}
          >
            @
          </div>
          <input
            type="text"
            placeholder="username"
            className={`outline-none  border-y ${
              isValid === false && "border-r-red-600 border-y-red-600"
            } ${
              isValid === true && "border-r-green-600 border-y-green-600"
            }  w-full  p-1 transition-all duration-300`}
            value={username}
            // onChange={(e) => handleChange(e.target.value)}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div
            className={`flex items-center bg-white border-r border-y p-1 rounded-r ${
              isValid === true && "border-r-green-600 border-y-green-600"
            } ${
              isValid === false && "border-r-red-600 border-y-red-600"
            } transition-all duration-300`}
          >
            <span className="text-white">@</span>
            <Puff
              visible={checkingUsername}
              height={20}
              width={20}
              color="#808080"
            />
          </div>
        </div>
        <button
          className={`${
            !isValid ? "bg-slate-600" : "bg-blue-500/90 hover:bg-blue-500"
          }  transition-all duration-300 text-white font-semibold rounded py-1`}
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserNameForm;
