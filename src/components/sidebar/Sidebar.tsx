import { sidebarMenuFn } from "./SidebarMenuList";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import Logo from "../header/logo";

const Sidebar = () => {
  const sidebarMenu = sidebarMenuFn();
  // const ability = useContext(AbilityContext);

  return (
    <div className="sidebar-shadow flex h-full min-h-screen w-52 flex-col bg-gray-200 font-text text-gray-800">
      <div className=" flex h-32 justify-center">
        <Link href="/">
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center">
              <Logo color={"#000000"} className="h-full w-full" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-medium">Good Doctor</h1>
            </div>
          </div>
        </Link>
      </div>

      <div className="sidebar-scrollbar grow overflow-y-auto bg-gray-200">
        {sidebarMenu.map((menu) => {
          if (
            menu.name === "Users" ||
            menu.name === "Setup" ||
            menu.name === "Invoices" ||
            menu.name === "Users"
          ) {
            return (
              <SidebarMenu
                key={menu.name}
                Icon={menu.Icon}
                name={menu.name}
                route={menu.route}
                subMenu={menu.subMenu}
              />
            );
          }
          return (
            <SidebarMenu
              key={menu.name}
              Icon={menu.Icon}
              name={menu.name}
              route={menu.route}
              subMenu={menu.subMenu}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
