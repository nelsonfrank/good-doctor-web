import React from "react";
import ReactTooltip from "react-tooltip";
import { createColumnHelper } from "@tanstack/react-table";

import Layout from "@/src/components/layout";
import Table from "@/src/components/table";
import { BsCheck2Square } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { formatDateString } from "@/src/utils/Utils";

type Appointment = {
  appointrmentId: string;
  status: "pending" | "accepted" | "denied";
  doctorId: string;
  individualId: string;
  category: "general" | "pediatric" | "dentist" | "ent_specialist";
  appointmentDate: string;
  forWho: string;
  created_at: string;
  description?: string;
};

const defaultData: Appointment[] = [
  {
    appointrmentId: "1",
    appointmentDate: formatDateString("11/05/2019"),
    forWho: "1 adult",
    status: "accepted",
    individualId: "Alice Winon",
    doctorId: "Dr.Joel Juma",
    category: "general",
    description: "The sooner the better",
    created_at: "14/04/2020",
  },
  {
    appointrmentId: "2",
    appointmentDate: formatDateString("11/05/2019"),
    forWho: "1 adult",
    status: "pending",
    individualId: "Alice Winon",
    doctorId: "Dr.Joel Juma",
    category: "general",
    description: "The sooner the better",
    created_at: "14/04/2020",
  },
  {
    appointrmentId: "3",
    appointmentDate: formatDateString("11/05/2019"),
    forWho: "1 adult",
    status: "pending",
    individualId: "Alice Winon",
    doctorId: "Dr.Joel Juma",
    category: "general",
    description: "The sooner the better",
    created_at: "14/04/2020",
  },
];

const columnHelper = createColumnHelper<Appointment>();

const columns = [
  columnHelper.accessor("appointmentDate", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="mr-4 text-sm font-semibold">Appointment Date</span>
    ),
  }),
  columnHelper.accessor("doctorId", {
    id: "doctorId",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="mr-4 text-sm font-semibold">Doctor</span>,
  }),
  columnHelper.accessor("individualId", {
    id: "individualId",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="mr-4 text-sm font-semibold">Patient</span>,
  }),
  columnHelper.accessor("category", {
    id: "category",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="mr-4 text-sm font-semibold">Category</span>,
  }),
  columnHelper.accessor("forWho", {
    header: () => (
      <span className="mr-4 text-sm font-semibold">Appointment for</span>
    ),
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("status", {
    header: () => <span className="mr-4 text-sm font-semibold">Status</span>,
    cell: (info) => {
      const status = info.getValue();
      const classes =
        status === "accepted"
          ? "bg-active text-active-deep"
          : " bg-gray-300 text-gray-700";
      const dotClasses =
        status === "accepted" ? "bg-active-deep" : " bg-gray-700";
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
  columnHelper.accessor("appointrmentId", {
    header: () => <span className="mr-4 text-sm font-semibold">Actions</span>,
    cell: (info) => {
      const id = info.getValue();
      const status = info.row.getValue("status");
      return (
        <div className="flex justify-center gap-6">
          <div data-tip="Accept">
            <BsCheck2Square className="text-xl text-gray-600" />
          </div>
          <div data-tip="Deny">
            <IoMdClose className="text-xl text-gray-600" />
          </div>
          <div className="flex justify-center text-xs lg:text-sm">
            <span
              className={`flex max-w-fit items-center rounded-xl bg-active py-1 px-2 text-active-deep`}
            >
              <span className={`h-2 w-2 rounded-full bg-active-deep`} />
              <span className="ml-2 capitalize">RSVP</span>
            </span>
          </div>

          <div data-tip="Delete" onClick={() => handleDeleteUser(id)}>
            <RiDeleteBin6Line className="text-xl text-red-500" />
          </div>
          <ReactTooltip place="bottom" type="dark" />
        </div>
      );
    },
  }),
];

const handleDeleteUser = (id: string) => {
  console.log(id);
};
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
