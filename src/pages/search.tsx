/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Layout from "@/src/components/layout";
import { BiUser, BiSearch } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiNurseLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import Select, { ActionMeta } from "react-select";
import DatePicker from "react-datepicker";
import Data from "@/config/data.json";

const Search = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

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
            <p className="text-lg font-medium text-gray-500">16 results</p>
          </div>

          <div className="my-6 grid grid-cols-cards-list gap-8 font-text">
            {Data.map(
              (
                doctor: {
                  name: string;
                  specialized: string;
                  work_place: string;
                  description: string;
                },
                index: number
              ) => (
                <div
                  key={`${index}-${doctor.name}`}
                  className="mb-8 max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <a href="#">
                    <img
                      src="/logo.svg"
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
                        {doctor.specialized.slice(0, 20)} -{" "}
                        {doctor.work_place.slice(0, 20)}
                      </h5>
                    </a>
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                      {doctor.description.slice(0, 100)}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center rounded-lg bg-purple-700 py-2 px-3 text-center text-sm font-medium text-white"
                    >
                      Request appointment
                    </a>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
