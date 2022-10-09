import React, { useState } from "react";
import Link from "next/link";
import SideMenu from "./side-menu";
import Logo from "./logo";
import { useSession, signIn, signOut } from "next-auth/react";
import Popup from "reactjs-popup";

import { BiUser } from "react-icons/bi";
import Spinner from "../spinner";
import { useRouter } from "next/router";

const Header = () => {
  const [sideMenu, showSideMenu] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const closeSideMenu = (close: boolean) => {
    showSideMenu(close);
  };

  const appliedTheme = "text-black";
  const appliedThemeIcon = "#000000";

  const { data: session } = useSession();

  const router = useRouter();

  console.log(session);

  const handleSignout = () => {
    setIsLoading(true);
    signOut();
    setIsLoading(false);
  };

  const handleNavigatToDashboard = () => {
    router.push("/dashboard/individual");
  };
  return (
    <header>
      <section
        className={`${appliedTheme} relative z-50 bg-transparent md:p-4`}
      >
        {!sideMenu ? (
          <div className="mt-3 flex h-20 items-center justify-between py-4 px-4 ">
            <div className="">
              <Link href="/">
                <div className="flex items-center">
                  <div className="flex h-20 w-20 items-center justify-center">
                    <Logo color={"#000000"} className="h-full w-full" />
                  </div>
                  <div className="ml-4">
                    <h1 className="font-header' text-2xl font-medium">
                      Good Doctor
                    </h1>
                  </div>
                </div>
              </Link>
            </div>

            <ul className="hidden font-medium md:flex md:justify-between">
              <button className="mx-8 px-1 text-lg font-medium text-gray focus:border-b-4 focus:border-purple-500">
                <Link href="/">Home</Link>
              </button>
              <button className="mx-8  text-lg font-medium text-gray focus:border-b-4 focus:border-purple-500">
                <Link href="/search">Search</Link>
              </button>
              {!session && (
                <button className="mx-8  text-lg font-medium text-gray focus:border-b-4 focus:border-purple-500">
                  <Link href="/auth/register">Register</Link>
                </button>
              )}

              {session && session.user?.email ? (
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
                  <div className="flex w-36 flex-col rounded-md border border-gray-500 px-4 py-4 text-center shadow-lg">
                    <button
                      className="my-2 border-b border-gray-500"
                      onClick={handleNavigatToDashboard}
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      className="my-2 flex justify-center border-b border-gray-500"
                      onClick={handleSignout}
                    >
                      {!loading ? "Logout" : <Spinner />}
                    </button>
                  </div>
                </Popup>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="mx-8 rounded-md bg-purple-500 px-8  py-2 text-lg font-medium text-white focus:border-b-4 focus:border-purple-500"
                >
                  Login
                </button>
              )}
            </ul>
            <div className="mt-0 flex justify-end md:hidden">
              <button
                type="button"
                style={{ width: 23, height: 23 }}
                onClick={() => showSideMenu(!sideMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 32 32"
                >
                  <rect
                    x="0"
                    y="3"
                    fill={appliedThemeIcon}
                    width="32"
                    height="5"
                    rx="3"
                    ry="3"
                  />
                  <rect
                    x="0"
                    y="14"
                    fill={appliedThemeIcon}
                    width="32"
                    height="5"
                    rx="3"
                    ry="3"
                  />
                  <rect
                    x="0"
                    y="25"
                    fill={appliedThemeIcon}
                    width="32"
                    height="5"
                    rx="3"
                    ry="3"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <SideMenu closeSideMenu={closeSideMenu} />
        )}
      </section>
    </header>
  );
};

export default Header;
