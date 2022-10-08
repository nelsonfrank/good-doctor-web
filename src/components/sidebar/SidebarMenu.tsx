import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SidebarMenuTypes {
  route?: string;
  Icon: JSX.Element;
  name: string;
}

interface SidebarMenuPropsType extends SidebarMenuTypes {
  subMenu?: SidebarMenuTypes[];
}
const SidebarMenu = (props: SidebarMenuPropsType) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const { route, Icon, name, subMenu } = props;

  const handlemenuClick = (items: any) => {
    const { route, subMenu } = items;
    if (subMenu) {
      router.push(subMenu[0].route);
      toggleIsOpen(!isOpen);
      return;
    }
    router.push(route);
  };
  const router = useRouter();
  const routePath = router.asPath;
  return (
    <div>
      <div
        tabIndex={0}
        className={`mx-auto my-4 flex w-5/6 cursor-pointer items-center justify-between rounded-sm py-2 px-2  ${
          isOpen ? "bg-gray-300 text-gray-500 outline-gray-300" : ""
        } `}
        onClick={() => handlemenuClick({ route, subMenu })}
      >
        {" "}
        <div className="flex items-center">
          <span className="mx-2">{Icon}</span>
          <p>{name}</p>
        </div>
        {subMenu && <FiChevronDown />}
      </div>
      {subMenu &&
        isOpen &&
        subMenu?.map((menu) => {
          if (
            menu.name === "Transfers" ||
            menu.name === "Statement" ||
            menu.name === "Sales"
          ) {
            return (
              <div key={menu.name} className="ml-4 mt-2">
                <Link href={menu?.route || ""}>
                  <div
                    tabIndex={0}
                    className={`focus:bg-primary focus:outline-primary mx-auto my-4 flex w-5/6 cursor-pointer items-center rounded-sm py-2 px-2 focus:text-white  ${
                      routePath.includes(String(menu?.route))
                        ? "bg-primary outline-primary text-white"
                        : ""
                    }`}
                  >
                    <span className="mx-2">{menu.Icon}</span>
                    <p>{menu.name}</p>
                  </div>
                </Link>
              </div>
            );
          }
          return (
            <div key={menu.name} className="ml-4 mt-2">
              <Link href={menu?.route || ""}>
                <div
                  tabIndex={0}
                  className={`focus:bg-primary focus:outline-primary mx-auto my-4 flex w-5/6 cursor-pointer items-center rounded-sm py-2 px-2 focus:text-white  ${
                    routePath.includes(String(menu?.route))
                      ? "bg-primary outline-primary text-white"
                      : ""
                  }`}
                >
                  <span className="mx-2">{menu.Icon}</span>
                  <p>{menu.name}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SidebarMenu;
