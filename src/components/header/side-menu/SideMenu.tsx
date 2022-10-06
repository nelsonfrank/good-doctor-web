import React from "react";
import Link from "next/link";

interface sideMenuProps {
  closeSideMenu: (close: boolean) => void;
}

const SideMenu = (props: sideMenuProps): JSX.Element => {
  const { closeSideMenu } = props;

  const handleCloseSideMenu = (toggle: boolean) => {
    closeSideMenu(toggle);
  };
  return (
    <section className="mt-3 min-h-screen bg-white py-4 px-4">
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          className="mt-2"
          onClick={() => handleCloseSideMenu(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            viewBox="0 0 24 24"
            width="32"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <ul className="flex h-full flex-col items-center justify-center font-medium text-black">
        <li className="hover:text-gray-lighter my-6 ">
          <Link
            href="/"
            className="focus:text-gray-lighter text-2xl"
            onClick={() => handleCloseSideMenu(false)}
          >
            Home
          </Link>
        </li>
        <li className="hover:text-gray-lighter my-6 ">
          <Link
            href="/gallery"
            className="focus:text-gray-lighter text-2xl"
            onClick={() => handleCloseSideMenu(false)}
          >
            Gallery
          </Link>
        </li>
        <li className="hover:text-gray-lighter my-6 ">
          <Link
            href="/commissions"
            className="focus:text-gray-lighter text-2xl"
            onClick={() => handleCloseSideMenu(false)}
          >
            Commissions
          </Link>
        </li>
        {/* <li className="my-6 hover:text-gray-lighter ">
          <Link
            href="/blog"
            className="focus:text-gray-lighter text-2xl"
            onClick={() => handleCloseSideMenu(false)}
          >
            Blog
          </Link>
        </li> */}

        <li className="hover:text-gray-lighter my-6 ">
          <Link
            href="/about"
            className="focus:text-gray-lighter text-2xl"
            onClick={() => handleCloseSideMenu(false)}
          >
            About Me
          </Link>
        </li>
        <li className="hover:text-gray-lighter my-6 ">
          <Link
            href="/about/#contacts"
            className="focus:text-gray-lighter text-2xl"
            onClick={() => handleCloseSideMenu(false)}
          >
            Contacts
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default SideMenu;
