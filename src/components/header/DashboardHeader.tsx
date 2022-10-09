import React, { useState } from "react";
import Link from "next/link";
import Popup from "reactjs-popup";

import { BiUser } from "react-icons/bi";
import Spinner from "../spinner";
import { useRouter } from "next/router";

const DashboardHeader = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    close();
  };

  const router = useRouter();
  const navigateToDashboard = () => {
    router.push("/dashboard/individual");
    close();
  };
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

            <Popup
              trigger={
                <div className="mx-8 flex flex-col items-center">
                  <button className="flex  h-12  w-12 items-center justify-center rounded-full border border-purple-500 text-lg font-medium text-purple-500">
                    <BiUser />
                  </button>
                </div>
              }
              position="bottom center"
            >
              <div className="flex w-36 flex-col rounded-md border border-gray-500 bg-white px-4 py-4 text-center shadow-lg">
                <button
                  className="my-2 border-b border-gray-500"
                  onClick={() => navigateToDashboard()}
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  className="my-2 flex justify-center border-b border-gray-500"
                  onClick={() => handleLogout()}
                >
                  {!loading ? "Logout" : <Spinner />}
                </button>
              </div>
            </Popup>
          </ul>
        </div>
      </section>
    </header>
  );
};

export default DashboardHeader;
