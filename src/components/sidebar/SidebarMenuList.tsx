import { FiLayout, FiUsers, FiGitPullRequest } from "react-icons/fi";

export const sidebarMenuFn = (rolePath: string) =>
  rolePath !== "admin"
    ? [
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
      ]
    : [
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
