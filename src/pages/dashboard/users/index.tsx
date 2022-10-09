import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import ReactTooltip from "react-tooltip";

import Layout from "@/src/components/layout";
import Table from "@/src/components/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbUserOff, TbUserCheck } from "react-icons/tb";
import { GrFormView } from "react-icons/gr";
import { trpc } from "@/src/server/common/client/trpc";
import { IUser } from "@/src/server/common/validation/auth";

type Person = {
  userId: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

const defaultData: Person[] = [
  {
    userId: 1,
    name: "Johnson Julias",
    email: "example@mail.com",
    role: "patient",
    status: "active",
  },
  {
    userId: 2,
    name: "Johnson Julias",
    email: "example@mail.com",
    role: "doctor",
    status: "inactive",
  },
  {
    userId: 3,
    name: "Johnson Julias",
    email: "example@mail.com",
    role: "admin",
    status: "active",
  },
];

const handleDeleteUser = (userId: string) => {
  console.log(userId);
  console.log("user deleted");
};
const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span className="mr-4 text-sm font-semibold">Full name</span>,
  }),
  columnHelper.accessor("email", {
    id: "email",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="mr-4 text-sm font-semibold">Email</span>,
  }),
  columnHelper.accessor("role", {
    header: () => <span className="mr-4 text-sm font-semibold">Role</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("status", {
    header: () => <span className="mr-4 text-sm font-semibold">Status</span>,
    cell: (info) => {
      const status = info.getValue();
      const classes =
        status === "active"
          ? "bg-active text-active-deep"
          : " bg-inactive text-inactive-deep";
      const dotClasses =
        status === "active" ? "bg-active-deep" : " bg-inactive-deep";
      return (
        <div className="flex justify-center text-xs lg:text-sm">
          <span
            className={`flex max-w-fit items-center rounded-xl py-1 px-2 ${classes}`}
          >
            <span className={`h-2 w-2 rounded-full ${dotClasses}`} />
            <span className="ml-2 capitalize">{status}</span>
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("id", {
    header: () => <span className="mr-4 text-sm font-semibold">Actions</span>,
    cell: (info) => {
      const id = info.getValue();
      const status = info.row.getValue("status");
      return (
        <div className="flex justify-center gap-6">
          <div data-tip="View">
            <GrFormView className="text-xl text-gray-500" />
          </div>

          {status !== "active" ? (
            <div data-tip="Activate">
              <TbUserCheck className="text-xl text-gray-500" />
            </div>
          ) : (
            <div data-tip="Deactivate">
              <TbUserOff className="text-xl text-gray-500" />
            </div>
          )}
          <div data-tip="Delete" onClick={() => handleDeleteUser(id)}>
            <RiDeleteBin6Line className="text-xl text-red-500" />
          </div>
          <ReactTooltip place="bottom" type="dark" />
        </div>
      );
    },
  }),
];
const Users = () => {
  const [data] = React.useState(() => [...defaultData]);

  const users = trpc.useQuery(["user.users"]);
  const allUsers = users
    ? users.data?.map((user) => ({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      }))
    : [];
  console.log(allUsers);
  return (
    <Layout>
      <div className="mt-10">
        <div>
          <div className="flex items-center justify-between ">
            <div>
              <h1 className="ml-4 text-2xl font-medium">Users</h1>
            </div>
          </div>

          <Table data={allUsers} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
