import React, { useState } from "react";
import Link from "next/link";
import SideMenu from "./side-menu";
import Logo from "./logo";

const Header = () => {
  const [sideMenu, showSideMenu] = useState(false);

  const closeSideMenu = (close: boolean) => {
    showSideMenu(close);
  };

  const appliedTheme = "text-black";
  const appliedThemeIcon = "#000000";
  return (
    <header>
      <section
        className={`${appliedTheme} relative z-50 bg-transparent md:p-4`}
      >
        {!sideMenu ? (
          <div className="mt-3 flex h-20 items-center justify-between py-4 px-4 ">
            <div className="">
              <Link href="/">
                <div className="h-20 w-20">
                  <Logo color={"#000000"} className="h-full w-full" />
                </div>
              </Link>
            </div>

            <ul className="hidden font-medium md:flex md:justify-between">
              <button className="mx-8 px-1 text-lg font-medium text-gray focus:border-b-4 focus:border-purple-500">
                {/* <Link href="/"> */}
                Home
                {/* </Link> */}
              </button>
              <button className="mx-8  text-lg font-medium text-gray focus:border-b-4 focus:border-purple-500">
                <Link href="/">About Us</Link>
              </button>
              <button className="mx-8  text-lg font-medium text-gray focus:border-b-4 focus:border-purple-500">
                <Link href="/auth/register">Register</Link>
              </button>

              <button className="mx-8 rounded-md bg-purple-500 px-8  py-2 text-lg font-medium text-white focus:border-b-4 focus:border-purple-500">
                <Link href="/auth/login">Login</Link>
              </button>
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
