import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { createColumnHelper } from "@tanstack/react-table";

import Layout from "@/src/components/layout";
import Table from "@/src/components/table";
import { BsCheck2Square } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { formatDateString } from "@/src/utils/Utils";
import { trpc } from "@/src/server/common/client/trpc";
import { useSession } from "next-auth/react";
import { router } from "@trpc/server";
import { useRouter } from "next/router";
import { IUser } from "@/src/server/common/validation/auth";

type Appointment = {
  id: string;
  appointrmentId: string;
  status: "pending" | "accepted" | "denied";
  doctorId: string;
  individualId: string;
  category: "general" | "pediatric" | "dentist" | "ent_specialist";
  appointmentDate: string;
  forWho: string;
  created_at: string;
  description?: string;
  patientCategory: string;
  patientId: string;
};

const Appointments = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const columnHelper = createColumnHelper<Appointment>();

  const utils = trpc.useContext();
  const columns = (user: IUser) => [
    columnHelper.accessor("appointmentDate", {
      cell: (info) => <span>{formatDateString(info.getValue())}</span>,
      header: () => (
        <span className="mr-4 text-sm font-semibold">Appointment Date</span>
      ),
    }),
    columnHelper.accessor("doctorId", {
      id: "doctorId",
      cell: (info) => {
        const user = trpc.useQuery(["user.byId", { id: info.getValue() }]);

        return <span>Dr.{user.data?.name}</span>;
      },
      header: () => <span className="mr-4 text-sm font-semibold">Doctor</span>,
    }),
      columnHelper.accessor("patientId", {
        id: "patientId",
        cell: (info) => {
          const user = trpc.useQuery(["user.byId", { id: info.getValue() }]);

          return <span>{user.data?.name}</span>;
        },
        header: () => (
          <span className="mr-4 text-sm font-semibold">Patient</span>
        ),
      });,
    columnHelper.accessor("category", {
      id: "category",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => (
        <span className="mr-4 text-sm font-semibold">Category</span>
      ),
    }),
    columnHelper.accessor("patientCategory", {
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
    columnHelper.accessor("id", {
      header: () => <span className="mr-4 text-sm font-semibold">Actions</span>,
      cell: (info) => {
        const id = info.getValue();
        const status = info.row.getValue("status");

        const { mutateAsync } = trpc.useMutation(["appointment.delete"], {
          onSuccess(input) {
            utils.invalidateQueries(["appointment.all"]);
            utils.invalidateQueries([
              "appointment.byId",
              { id: input.id, role: user.role },
            ]);
          },
        });

        const mut = trpc.useMutation(["appointment.update"], {
          onSuccess(input) {
            console.log("input");
            utils.invalidateQueries(["appointment.all"]);
            utils.invalidateQueries([
              "appointment.byId",
              { id: input.id, role: user.role },
            ]);
          },
        });
        const handleDeleteUser = (id: string) => {
          const deleteItem = mutateAsync(
            { id: String(id) },
            {
              onSuccess: () => {
                queryCache.invalidateQueries([]);
              },
            }
          );
        };

        const handleAcceptAppointment = () => {
          const val = mut.mutateAsync({ id, status: "accepted" });
        };

        const handleDenyAppointment = () => {
          const res = mut.mutateAsync({ id, status: "denied" });
        };
        return (
          <div className="flex justify-center gap-6">
            {user.role === "doctor" && (
              <>
                <div data-tip="Accept" onClick={handleAcceptAppointment}>
                  <BsCheck2Square className="text-xl text-gray-600" />
                </div>
                <div data-tip="Deny" onClick={handleDenyAppointment}>
                  <IoMdClose className="text-xl text-gray-600" />
                </div>
              </>
            )}
            {user.role === "patients" && status === "accepted" && (
              <div className="flex justify-center text-xs lg:text-sm">
                <span
                  className={`flex max-w-fit items-center rounded-xl bg-active py-1 px-2 text-active-deep`}
                >
                  <span className={`h-2 w-2 rounded-full bg-active-deep`} />
                  <span className="ml-2 capitalize">RSVP</span>
                </span>
              </div>
            )}

            {user.role === "admin" && (
              <div data-tip="Delete" onClick={() => handleDeleteUser(id)}>
                <RiDeleteBin6Line className="text-xl text-red-500" />
              </div>
            )}
            <ReactTooltip place="bottom" type="dark" />
          </div>
        );
      },
    }),
  ];

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [router, session]);

  const [userId, setUserId] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      const user = session.user;
      setUserId(user.id);
      setUserRole(user.role);
    }

    return () => {
      setUserId("");
      setUserRole("");
    };
  }, [session?.user]);

  const response = trpc.useQuery([
    "appointment.byId",
    { id: String(userId), role: String(userRole) },
  ]);

  const data = response && response.data ? response.data : [];

  return (
    <Layout>
      <div className="mt-10">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="ml-4 text-2xl font-medium">Appointments</h1>
            </div>
          </div>

          {session?.user && (
            <Table data={data} columns={columns(session?.user)} />
          )}
        </div>
      </div>
    </Layout>
  );
};


export default Appointments;
