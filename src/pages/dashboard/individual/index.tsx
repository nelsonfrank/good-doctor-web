import Layout from "@/src/components/layout";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const IndividualDashbaord = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <Layout>
      <div className="container mx-auto">
        <p>Individual dashboard</p>
      </div>
    </Layout>
  );
};

export default IndividualDashbaord;
