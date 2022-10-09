import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "@/src/components/layout";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IUser } from "@/src/server/common/validation/auth";
interface LoginFormType {
  email: string;
  password: string;
}
const Login = () => {
  const router = useRouter();

  const [signinError, setSigninError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      const user = session.user as IUser;
      const redirectUrl =
        user.role === "patient"
          ? "individual"
          : user.role === "doctor"
          ? "doctor"
          : "admin";
      router.replace(`/dashboard/${redirectUrl}`);
    }
  }, [router, session]);

  const onSubmit: SubmitHandler<LoginFormType> = async ({
    email,
    password,
  }) => {
    const res = await signIn("credentials", {
      email,
      password,
      // The page where you want to redirect to after a
      // successful login
      callbackUrl: `/dashboard/individual`,
      redirect: false,
    });

    if (res?.url) {
      console.log(res?.url);
    }
    if (res?.error) {
      setSigninError(res?.error);
    }
  };
  return (
    <Layout>
      <div>
        <div className="container mx-auto max-w-4xl">
          <div className="my-8">
            <h1 className="text-center text-2xl font-semibold">Sign In</h1>
          </div>
          {signinError && (
            <div className="flex justify-center">
              <p className="text-sm text-red-500">
                {" "}
                Email or password is incorrect
              </p>
            </div>
          )}
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
