import Layout from "@/src/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const DoctorDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-medium">
          This is doctor dashbaord
        </h2>
        <h2 className="text-center text-xl font-medium">
          Welcome {session?.user?.name}
        </h2>
        <div className="mt-24 flex justify-center gap-10">
          <button
            className="rounded-md bg-gray-500 py-4 px-12 text-center text-white"
            onClick={() => router.push("/dashboard/appointments")}
          >
            View all appointments
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
