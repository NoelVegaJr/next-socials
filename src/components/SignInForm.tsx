import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface IAuthPageProps {}

const SignInForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const session = await signIn("credentials", {
          redirect: false,
          username: "noel",
          password: "spring",
        });
        console.log(session);
      }}
    >
      <Form className="flex flex-col gap-4 ">
        {/* <div className="flex flex-col">
          <Field
            name="username"
            type="text"
            className="outline-none border rounded p-1"
            placeholder="Username"
          />
          <div className="text-red-400 text-xs">
            <ErrorMessage name="username" />
          </div>
        </div>
        <div className="flex flex-col">
          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="outline-none border rounded p-1"
          />
          <div className="text-red-400 text-xs">
            <ErrorMessage name="password" />
          </div>
        </div>

        <button
          type="submit"
          className=" bg-blue-500 text-white px-6 p-2 rounded"
        >
          Sign In
        </button> */}
        {/* <div className="flex items-center gap-2">
          <div className="h-0.5 bg-slate-300 grow" />
          <p className="text-center font-semibold text-slate-300">Or</p>
          <div className="h-0.5 bg-slate-300 grow" />
        </div> */}
        <button
          className="flex items-center gap-2 justify-center text-white bg-slate-600 p-2 rounded"
          onClick={() => signIn("google")}
        >
          <Image
            src="/google-logo.png"
            alt="google logo"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
