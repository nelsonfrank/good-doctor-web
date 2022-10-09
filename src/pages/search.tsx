/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import Layout from "@/src/components/layout";
import { BiUser, BiSearch } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiNurseLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import Select, { ActionMeta } from "react-select";
import DatePicker from "react-datepicker";
import Data from "@/config/data.json";
import { trpc } from "@/src/server/common/client/trpc";
import { randomAvatarImg } from "../utils/Utils";
import Popup from "reactjs-popup";
import { useSession } from "next-auth/react";
import { router } from "@trpc/server";
import { useRouter } from "next/router";

const Search = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [patientCategory, setPatientCategory] = useState("");

  const { data: session } = useSession();
  const response = trpc.useQuery(["user.byRole", { role: "doctor" }]);
  const doctors = response.data || [];
  interface Option {
    label: string;
    value: string;
  }

  const router = useRouter();
  const handlePatientCategoryChage = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    if (actionMeta.action === "select-option") {
      if (option?.value) {
        setPatientCategory(option?.value);
      }
    }
    if (actionMeta.action === "clear") {
      setPatientCategory("");
    }
  };

  const handlePatientChage = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(option);
    console.log(actionMeta);
  };

  const { mutateAsync } = trpc.useMutation(["appointment.create"]);

  const handleCreateAppointment = useCallback(
    async (id: string, specialization: string) => {
      if (session?.user) {
        const result = await mutateAsync({
          appointmentDate: startDate,
          patientCategory: patientCategory,
          doctorId: id,
          patientId: session?.user ? session.user?.id : "",
          category: specialization,
          status: "pending",
        });
        console.log(result);
        if (result?.status === "pending") {
          router.push("/dashboard/appointments");
        }
      } else {
        router.push("/auth/login");
      }
    },
    [mutateAsync, patientCategory, session?.user, startDate, router]
  );

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div>
          <div className="flex items-center ">
            <h2 className="mr-4 font-text text-2xl font-medium">Search</h2>
          </div>
          <div className="mt-8 grid grid-cols-cards-list gap-8">
            <div className="flex rounded-md bg-gray-200 p-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-gray-500">
                <HiOutlineLocationMarker />
              </div>
              <div className=" flex flex-col">
                <p className="text-sm font-light text-gray-400">Location</p>
                <input
                  placeholder="Dar es salaam, Tanzania"
                  className="bg-transparent text-lg font-medium text-black outline-none"
                />
              </div>
            </div>
            <div className="flex rounded-md bg-gray-200 p-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-gray-500">
                <RiNurseLine />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-light text-gray-400">Who</p>

                <Select
                  options={[
                    { value: "general", label: "General" },
                    { value: "Pediatric", label: "Pediatric" },
                    { value: "dentist", label: "Dentist" },
                    { value: "ENT Specialist", label: "ENT Specialist" },
                  ]}
                  placeholder="Doctor"
                  className="bg-transparent"
                  styles={{
                    valueContainer: (provided: any) => ({
                      ...provided,
                      paddingLeft: "0rem",
                    }),
                    control: (provided: any, state: any) => ({
                      ...provided,
                      boxShadow: "none",
                      border: "none",
                      fontSize: "1.125rem",
                      backgroundColor: "transparent",
                    }),
                    menu: (provided: any, state: any) => ({
                      ...provided,
                      border: "none",
                      // boxShadow: "none",
                    }),
                    option: (provided: any, state: { isFocused: any }) => ({
                      ...provided,
                      backgroundColor: state.isFocused && "lightgray",
                      color: state.isFocused && "gray",
                    }),
                  }}
                  isClearable={true}
                  onChange={handlePatientChage}
                />
              </div>
            </div>
            <div className="flex rounded-md bg-gray-200 p-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-gray-500">
                <IoCalendarOutline />
              </div>
              <div className=" flex flex-col">
                <p className="text-sm font-light text-gray-400">
                  Appointment Date
                </p>

                <DatePicker
                  dateFormat="dd MMMM yyyy"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="04 August 2022"
                  className=" bg-transparent text-lg font-medium text-gray-500 outline-none"
                />
              </div>
            </div>
            <div className="flex  rounded-md bg-gray-200 p-1.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-gray-500">
                <BiUser />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-light text-gray-400">Who</p>

                <Select
                  options={[
                    { value: "1 adult", label: "1 Adult" },
                    { value: "1 child", label: "1 Child" },
                    { value: "other", label: "Other" },
                  ]}
                  placeholder="1 Adult"
                  className="bg-transparent"
                  styles={{
                    valueContainer: (provided: any) => ({
                      ...provided,
                      paddingLeft: "0rem",
                    }),
                    control: (provided: any, state: any) => ({
                      ...provided,
                      boxShadow: "none",
                      border: "none",
                      fontSize: "1.125rem",
                      backgroundColor: "transparent",
                    }),
                    menu: (provided: any, state: any) => ({
                      ...provided,
                      border: "none",
                      // boxShadow: "none",
                    }),
                    option: (provided: any, state: { isFocused: any }) => ({
                      ...provided,
                      backgroundColor: state.isFocused && "lightgray",
                      color: state.isFocused && "gray",
                    }),
                  }}
                  isClearable={true}
                  onChange={handlePatientChage}
                />
              </div>
            </div>
            <div className="">
              <button className="flex rounded-lg bg-purple-500 py-4 px-5 text-lg font-medium text-white">
                <BiSearch className="text-3xl font-thin" />
                <span className="ml-2">Search</span>
              </button>
            </div>
          </div>
        </div>
        <div className="my-10 mx-2">
          <div>
            <p className="text-lg font-medium text-gray-500">
              {doctors.length} results
            </p>
          </div>

          <div className="my-6 grid grid-cols-cards-list gap-8 font-text">
            {doctors?.map((doctor: any, index: number) => {
              const avatar = randomAvatarImg(Data);
              return (
                <div
                  key={`${index}-${doctor.name}`}
                  className="mb-8 max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <a href="#">
                    <img
                      src={avatar}
                      alt="Card"
                      className="max-h-48 w-full rounded-t-lg"
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Dr.{doctor.name}
                      </h5>
                    </a>
                    <a href="#">
                      <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                        {doctor.specialization} -{doctor.workPlace}
                      </h5>
                    </a>
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                      {doctor.description.slice(0, 100)}
                    </p>

                    <Popup
                      trigger={
                        <button
                          type="button"
                          className="inline-flex items-center rounded-lg bg-purple-700 py-2 px-3 text-center text-sm font-medium text-white"
                        >
                          Request appointment
                        </button>
                      }
                      modal
                    >
                      <div className="modal">
                        <div className="header"> Make appointment </div>
                        <div className="content flex justify-center">
                          <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
                            <div className="flex flex-col pb-3">
                              <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                                Doctor Name
                              </dt>
                              <dd className="text-lg font-semibold">
                                Dr.{doctor.name}
                              </dd>
                            </div>
                            <div className="flex flex-col py-3">
                              <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                                Specialization
                              </dt>
                              <dd className="text-lg font-semibold">
                                {doctor.specialization} - {doctor.workPlace}
                              </dd>
                            </div>
                            <div className="flex flex-col pt-3">
                              <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                                Email
                              </dt>
                              <dd className="text-lg font-semibold">
                                {doctor.email}
                              </dd>
                            </div>
                            <div className="flex flex-col pt-3">
                              <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                                Appointment date
                              </dt>
                              <dd className="text-lg font-semibold">
                                <DatePicker
                                  dateFormat="dd MMMM yyyy"
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  placeholderText="Appointment date"
                                  className=" bg-transparent text-lg font-medium text-black outline-none"
                                />
                              </dd>
                            </div>
                            <div className="flex flex-col pt-4">
                              <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                                Patient
                              </dt>
                              <div className="text-lg font-semibold">
                                <Select
                                  options={[
                                    { value: "1 adult", label: "1 Adult" },
                                    { value: "1 child", label: "1 Child" },
                                    { value: "other", label: "Other" },
                                  ]}
                                  placeholder="Patient"
                                  className="bg-transparent"
                                  styles={{
                                    valueContainer: (provided: any) => ({
                                      ...provided,
                                      paddingLeft: "0rem",
                                    }),
                                    control: (provided: any, state: any) => ({
                                      ...provided,
                                      boxShadow: "none",
                                      border: "none",
                                      fontSize: "1.125rem",
                                      backgroundColor: "transparent",
                                    }),
                                    menu: (provided: any, state: any) => ({
                                      ...provided,
                                      border: "none",
                                      // boxShadow: "none",
                                    }),
                                    option: (
                                      provided: any,
                                      state: { isFocused: any }
                                    ) => ({
                                      ...provided,
                                      backgroundColor:
                                        state.isFocused && "lightgray",
                                      color: state.isFocused && "gray",
                                    }),
                                  }}
                                  isClearable={true}
                                  onChange={handlePatientCategoryChage}
                                />
                              </div>
                            </div>
                          </dl>
                        </div>
                        <div className="actions mt-8 flex justify-center">
                          <button
                            className="flex rounded-lg bg-purple-500 py-4 px-5 text-lg font-medium text-white"
                            onClick={() =>
                              handleCreateAppointment(
                                doctor.id,
                                doctor.specialization
                              )
                            }
                          >
                            Place appointment
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};



export default Search;
