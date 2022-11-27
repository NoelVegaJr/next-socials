import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { useState } from "react";

interface IAuthPageProps {
  authSession: Session;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
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
      authSession: session,
    },
  };
}

const AuthPage = ({ authSession }: IAuthPageProps) => {
  const [authForm, setAuthForm] = useState("Sign In");
  console.log(authSession);
  return (
    <div className="h-screen w-full flex flex-col ">
      <div className="w-full border-b border-b-slate-100 h-16 flex justify-center items-center font-extrabold text-blue-500 text-2xl bg-white">
        Next Social
      </div>
      <div className="flex justify-center items-center grow bg-slate-100">
        <div className="max-w-xl grow border p-6 rounded-xl flex flex-col gap-6 bg-white">
          {/* {authForm === "Sign In" ? <SignInForm /> : <SignUpForm close={} />} */}
          <p
            className="cursor-pointer text-blue-500"
            onClick={(e) => setAuthForm(e.currentTarget.innerText)}
          >
            {authForm === "Sign In" ? "Sign Up" : "Sign In"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
