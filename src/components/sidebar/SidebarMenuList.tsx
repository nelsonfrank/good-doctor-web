import { FiLayout, FiUsers, FiGitPullRequest } from "react-icons/fi";

const rolePath = "individual";
export const sidebarMenuFn = () => [
  {
    name: "Dashboard",
    Icon: <FiLayout />,
    route: `/dashboard/${rolePath}`,
  },
  {
    name: "Appointments",
    Icon: <FiGitPullRequest />,
    route: `/dashboard/appointments`,
  },
  {
    name: "Users",
    Icon: <FiUsers />,
    route: "/dashboard/users",
  },
];
