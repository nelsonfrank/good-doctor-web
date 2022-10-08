import React from "react";
import Link from "next/link";
import Logo from "./logo";
import { BiUser } from "react-icons/bi";

const DashboardHeader = () => {
  return (
    <header>
      <section className={`relative z-50 bg-transparent md:p-4`}>
        <div className="mt-3 flex h-20 items-center justify-end py-4 px-4 ">
          <ul className="hidden font-medium md:flex md:justify-between">
            <button className="mx-8 px-1 text-lg font-medium text-gray focus:border-b-4 focus:border-purple-500">
              <Link href="/">Home</Link>
            </button>
            <button className="mx-8  text-lg font-medium text-gray focus:border-b-4 focus:border-purple-500">
              <Link href="/search">Search</Link>
            </button>

            <div className="mx-8 flex flex-col items-center">
              <button className="flex  h-12  w-12 items-center justify-center rounded-full border border-purple-500 text-lg font-medium text-purple-500">
                <BiUser />
              </button>
            </div>
          </ul>
        </div>
      </section>
    </header>
  );
};

export default DashboardHeader;
