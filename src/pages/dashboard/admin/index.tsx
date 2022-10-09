import React from "react";
import Layout from "@/src/components/layout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const AdminDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-medium">
          This is admin dashbaord
        </h2>
        <h2 className="text-center text-xl font-medium">
          Welcome {session?.user?.name}
        </h2>
        <div className="mt-24 flex justify-center gap-10">
          <button
            className="rounded-md bg-purple-500 py-4 px-12 text-center text-white"
            onClick={() => router.push("/search")}
          >
            Searcch for a specialist
          </button>
          <button
            className="rounded-md bg-gray-500 py-4 px-12 text-center text-white"
            onClick={() => router.push("/dashboard/appointments")}
          >
            View all appointments
          </button>
          <button
            className="rounded-md border border-orange-500 bg-white py-4 px-12 text-center text-black"
            onClick={() => router.push("/dashboard/users")}
          >
            View all users
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
