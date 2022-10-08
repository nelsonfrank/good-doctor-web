import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select, { ActionMeta } from "react-select";
import Layout from "@/src/components/layout";
import Link from "next/link";

interface SignupFormType {
  fullName: string;
  specialization: { label: string; value: string };
  workPlace: string;
  dot: Date;
  email: string;
  password: string;
}
const DoctorRegistration = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormType>();

  const onSubmit: SubmitHandler<SignupFormType> = (data) => {
    console.log(data);
  };

  interface Option {
    label: string;
    value: string;
  }
  const handlePatientChage = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(option);
    console.log(actionMeta);
  };
  return (
    <Layout>
      <div>
        <div className="container mx-auto max-w-4xl">
          <div className="my-8">
            <h1 className="text-center text-2xl font-semibold">Sign up</h1>
            <p className="mt-8 text-center">
              This registration page is for doctor, If you are individual
              register{" "}
              <Link href="/auth/register">
                <span className="cursor-pointer text-blue-600">here</span>
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex w-96 flex-col items-center"
          >
            <div className="my-6 flex w-full flex-col">
              <label htmlFor="fullName" className="ml-1 mb-2 text-lg">
                Full name
              </label>
              <input
                type="text"
                placeholder="Full name"
                className="mb-2 w-full rounded-md border border-gray-400 py-4 px-4 text-lg outline-none"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="my-6 flex w-full flex-col">
              <label htmlFor="workPlace" className="ml-1 mb-2 text-lg">
                Work place
              </label>
              <input
                type="text"
                placeholder="Work place"
                className="mb-2 w-full rounded-md border border-gray-400 py-4 px-4 text-lg outline-none"
                {...register("workPlace", { required: true })}
              />
              {errors.workPlace && (
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
              <label htmlFor="specialization" className="ml-1 mb-2 text-lg">
                Specialization
              </label>

              <Controller
                name="specialization"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "general", label: "General" },
                      { value: "Pediatric", label: "Pediatric" },
                      { value: "dentist", label: "Dentist" },
                      { value: "ENT Specialist", label: "ENT Specialist" },
                    ]}
                    placeholder="Specialization"
                    styles={{
                      control: (provided: any, state: any) => ({
                        ...provided,
                        boxShadow: "none",
                        border: "1px solid gray",
                        padding: "0.825rem 0.5rem",
                      }),

                      option: (provided: any, state: { isFocused: any }) => ({
                        ...provided,
                        backgroundColor: state.isFocused && "lightgray",
                        color: state.isFocused && "gray",
                      }),
                    }}
                    isClearable={true}
                    // onChange={handlePatientChage}
                  />
                )}
              />

              {errors.specialization && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="my-6 flex w-full flex-col">
              <label htmlFor="password" className="ml-1 mb-2 text-lg">
                Description
              </label>
              <textarea
                placeholder="Describe what you do base on your specialization"
                className="mb-2 w-full rounded-md border border-gray-400 py-4 px-4  outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
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
                placeholder="Password"
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

export default DoctorRegistration;
