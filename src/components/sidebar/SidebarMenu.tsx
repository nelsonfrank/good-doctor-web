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
    const { route } = items;

    router.push(route);
  };
  const router = useRouter();
  const routePath = router.asPath;
  return (
    <div>
      <div
        tabIndex={0}
        className={`mx-auto my-4 flex w-5/6 cursor-pointer items-center rounded-sm py-2 px-2 focus:bg-purple-500 focus:text-white focus:outline-purple-500  ${
          routePath.includes(String(route))
            ? "bg-purple-500 text-white outline-purple-500"
            : ""
        }`}
        onClick={() => handlemenuClick({ route, subMenu })}
      >
        {" "}
        <div className="flex items-center">
          <span className="mx-2">{Icon}</span>
          <p>{name}</p>
        </div>
        {subMenu && <FiChevronDown />}
      </div>
    </div>
  );
};

export default SidebarMenu;
