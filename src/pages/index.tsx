import { NextPageContext } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "../components/Modal";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "home",
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

export default function Home() {
  const [createNewAccount, setCreateNewAccount] = useState<boolean>(false);

  return (
    <div className="h-screen w-full bg-slate-100 grid place-content-center">
      <div className="flex gap-20">
        <div className="w-1/2">
          <p className="text-blue-600 font-bold text-3xl">Code Fork</p>
          <p className="text-2xl">
            Connect with friends, teamates and the world around you on Devy.
          </p>
        </div>
        <div className="w-1/2 flex flex-col gap-8">
          <div className="flex justify-center items-center grow bg-slate-100">
            <div className="max-w-xl grow border p-6 rounded-xl flex flex-col gap-6 bg-white">
              <SignInForm />
            </div>
          </div>
          {/* <div>
            <button
              onClick={() => {
                setCreateNewAccount(true);
              }}
              className="text-white bg-green-500 hover:bg-green-600 transition-all duration-300 py-2 w-full font-semibold rounded"
            >
              Create New Account
            </button>
          </div> */}
        </div>
      </div>
      {createNewAccount && (
        <Modal close={() => setCreateNewAccount(false)}>
          <SignUpForm
            close={() => {
              setCreateNewAccount(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
