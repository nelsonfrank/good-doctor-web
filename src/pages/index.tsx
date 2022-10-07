import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Select, { ActionMeta } from "react-select";
import DatePicker from "react-datepicker";
import { HiUserGroup } from "react-icons/hi";
import { FaTooth, FaChild, FaHeadSideCough } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { BiUser, BiSearch } from "react-icons/bi";

// components
import Header from "@/src/components/header";
import { useState } from "react";

const Home: NextPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const path = "/img/home.jpg";

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
    <>
      <Header />
      <main className="container relative mx-auto p-4">
        <div className="mb-24 flex">
          <div className="w-1/2 pt-24 pl-24">
            <h1 className="my-16 font-header text-6xl font-bold leading-snug ">
              Find your doctor and make an appointment
            </h1>
            <p className="font-text text-xl text-gray-400">
              Select preferred doctor and time slot to book appointment or
              consultation.
            </p>
          </div>
          <div className="absolute top-0 -right-5 w-1/2">
            <Image
              src={path}
              layout="responsive"
              className="max-w-max"
              alt="Home"
              width={500}
              height={600}
            />
          </div>
        </div>
        <div className="absolute ml-16 mt-8 rounded-lg bg-white py-8 px-8 shadow-md">
          <div>
            <div className="flex items-center ">
              <h2 className="mr-4 font-text text-2xl font-medium">
                Book Appointment Now
              </h2>
              <div className="flex">
                <button className="mx-8 flex items-center px-1 text-lg font-medium text-gray  outline-none focus:border-b-4 focus:border-purple-500 focus:text-purple-500">
                  <HiUserGroup />
                  <span className="ml-2">General</span>
                </button>
                <button className="mx-8 flex items-center px-1 text-lg font-medium text-gray  outline-none focus:border-b-4 focus:border-purple-500 focus:text-purple-500">
                  <FaChild />
                  <span className="ml-2">Pediatric</span>
                </button>
                <button className="mx-8 flex items-center px-1 text-lg font-medium text-gray  outline-none focus:border-b-4 focus:border-purple-500 focus:text-purple-500">
                  <FaTooth />

                  <span className="ml-2">Dentist</span>
                </button>
                <button className="mx-8 flex items-center px-1 text-lg font-medium text-gray  outline-none focus:border-b-4 focus:border-purple-500 focus:text-purple-500">
                  <FaHeadSideCough rotate={180} />
                  <span className="ml-2">ENT Specialist</span>
                </button>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-2xl text-white">
                  <HiOutlineLocationMarker />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-light text-gray-400">Location</p>
                  <input
                    placeholder="Dar es salaam, Tanzania"
                    className="text-lg font-medium text-gray-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-300 text-2xl text-orange-300">
                  <IoCalendarOutline />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-light text-gray-400">
                    Appointment Date
                  </p>

                  <DatePicker
                    dateFormat="dd MMMM yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="04 August 2022"
                    className=" text-lg font-medium text-gray-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-300 text-2xl text-orange-300">
                  <BiUser />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-light text-gray-400">Who</p>

                  <Select
                    options={[
                      { value: "1 adult", label: "1 Adult" },
                      { value: "1 child", label: "1 Child" },
                      { value: "other", label: "Other" },
                    ]}
                    placeholder="1 Adult"
                    className="border-none"
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
                      }),
                      menu: (provided: any, state: any) => ({
                        ...provided,
                        border: "none",
                        boxShadow: "none",
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
              <div>
                <button className="flex rounded-lg bg-purple-500 py-5 px-5 text-lg font-medium text-white">
                  <BiSearch className="text-3xl font-thin" />
                  <span className="ml-2">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </main>
    </>
  );
};

export default Home;

