import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface IAuthPageProps {
  close: () => void;
}

const SignUpForm = ({ close }: IAuthPageProps) => {
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        username: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        password: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Passwords must match"
        ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className=" bg-white  rounded">
        <div className="border-b px-6 py-6 flex justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-3xl font-bold">Sign Up</p>
            <p className="">Its quick and easy</p>
          </div>
          <button
            onClick={close}
            className="grid place-content-center w-8 h-8 rounded-full hover:bg-slate-100 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="text"
              className="outline-none border rounded p-1"
            />
            <div className="text-red-400 text-xs">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              type="text"
              className="outline-none border rounded p-1"
            />
            <div className="text-red-400 text-xs">
              <ErrorMessage name="username" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              className="outline-none border rounded p-1"
            />
            <div className="text-red-400 text-xs">
              <ErrorMessage name="password" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              name="confirmPassword"
              type="password"
              className="outline-none border rounded p-1"
            />
            <div className="text-red-400 text-xs">
              <ErrorMessage name="confirmPassword" />
            </div>
          </div>

          <button
            type="submit"
            className=" bg-green-500 hover:bg-green-600 transition-all duration-300 text-white px-6 p-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
