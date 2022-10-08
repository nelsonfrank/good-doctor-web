import React from "react";
import { createColumnHelper } from "@tanstack/react-table";

import Layout from "@/src/components/layout";
import Table from "@/src/components/table";

type Person = {
  test: string;
  created_at: string;
  tasks: number;
  status: string;
};

const defaultData: Person[] = [
  {
    test: "Task 1",
    created_at: "14/04/2020",
    tasks: 2,
    status: "active",
  },
  {
    test: "Test 2",
    created_at: "14/04/2020",
    tasks: 5,
    status: "inactive",
  },
  {
    test: "Test 3",
    created_at: "14/04/2020",
    tasks: 10,
    status: "active",
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("test", {
    cell: (info) => info.getValue(),
    header: () => <span className="mr-4 text-sm font-semibold">Test</span>,
  }),
  columnHelper.accessor("created_at", {
    id: "created_at",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="mr-4 text-sm font-semibold">Created</span>,
  }),
  columnHelper.accessor("tasks", {
    header: () => <span className="mr-4 text-sm font-semibold">Tasks</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("status", {
    header: () => <span className="mr-4 text-sm font-semibold">Tasks</span>,
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
];
const Appointments = () => {
  const [data] = React.useState(() => [...defaultData]);
  return (
    <Layout>
      <div className="mt-10">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="ml-4 text-2xl font-medium">Appointments</h1>
            </div>
          </div>

          <Table data={data} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
