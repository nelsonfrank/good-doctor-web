import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Layout from "@/src/components/layout";
import Link from "next/link";

interface SignupFormType {
  firstName: string;
  lastName: string;
  dot: Date;
  email: string;
  password: string;
}
const UserRegistration = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormType>();

  const onSubmit: SubmitHandler<SignupFormType> = (data) => {
    console.log(data);
  };
  return (
    <Layout>
      <div>
        <div className="container mx-auto max-w-4xl">
          <div className="my-8">
            <h1 className="text-center text-2xl font-semibold">Sign up</h1>
            <p className="mt-8 text-center">
              This registration page is for individual, If you are doctor
              register{" "}
              <Link href="/auth/register/doctor">
                <span className="cursor-pointer text-blue-600">here</span>
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex w-96 flex-col items-center"
          >
            <div className="my-6 flex w-full flex-col">
              <label htmlFor="firstName" className="ml-1 mb-2 text-lg">
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="mb-2 w-full rounded-md border border-gray-400 py-4 px-4 text-lg outline-none"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="my-6 flex w-full flex-col">
              <label htmlFor="lastName" className="ml-1 mb-2 text-lg">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="mb-2 w-full rounded-md border border-gray-400 py-4 px-4 text-lg outline-none"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="my-6 flex w-full flex-col">
              <label htmlFor="dot" className="ml-1 mb-2 text-lg">
                Date of birth
              </label>

              <Controller
                name="dot"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={30}
                    wrapperClassName="date-picker"
                    placeholderText="Date of birth"
                    onChange={(date) => field.onChange(date)}
                    className="mb-2 w-full rounded-md border border-gray-400 py-4 px-4 text-lg outline-none"
                  />
                )}
              />

              {errors.dot && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserRegistration;
