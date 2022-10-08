import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "@/src/components/layout";

interface LoginFormType {
  email: string;
  password: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    console.log(data);
  };
  return (
    <Layout>
      <div>
        <div className="container mx-auto max-w-4xl">
          <div className="my-8">
            <h1 className="text-center text-2xl font-semibold">Sign In</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex w-96 flex-col items-center"
          >
            <div className="my-6 flex w-full flex-col">
              <label htmlFor="email" className="ml-1 mb-2 text-lg">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className="mb-2 w-full rounded-md border border-gray-400 py-4 px-4 text-lg outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="my-6 flex w-full flex-col">
              <label htmlFor="password" className="ml-1 mb-2 text-lg">
                Password
              </label>
              <input
                type="password"
                placeholder="Email"
                className="mb-2 w-full rounded-md border border-gray-400 py-4 px-4 text-lg outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="my-8">
              <button
                type="submit"
                className="rounded-md bg-purple-500 py-4 px-12 text-center text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
