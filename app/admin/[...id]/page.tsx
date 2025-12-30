"use client";

import { useUser } from "@/app/context/UserContext";
import { AdminPanel } from "../_components/AdminPanel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSingleUser } from "@/lib/auth/getUser";
import CircularProgress from "@mui/material/CircularProgress";

type PageProps = {
  params: {
    userId: string;
  };
};

const Page = ({ params }: PageProps) => {
  const { user, token } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchUser = async () => {
      try {
        const data = await getSingleUser(user._id);
        setUserData(data);
      } catch (error) {
        console.error("Error retrieving user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, user?._id]);

  if (loading) {
    return (
      <div className="flex bg-gradient-to-b from-yellow-500 to-blue-400 justify-center items-center h-screen ">
       <CircularProgress/>
      </div>
    );
  }

  if (!user || !userData || userData.role !== "admin") {
    return (
      <div className="bg-gradient-to-b from-yellow-500 to-blue-400 h-screen w-full flex gap-x-10 justify-center items-center">
        <h1 className="text-[20px] font-bold">
          Sorry, only admins have access to this page. Return home here
        </h1>
        <Button className="bg-green-500 p-3 text-black" onClick={() => window.location.href = "/"}>
          Home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-yellow-500 to-blue-400 h-auto min-h-screen w-full flex flex-col items-center">
      <div>
        <h1 className="font-bold text-[40px]">Admin panel</h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center mb-[30px] rounded-md mt-[30px]">
        <AdminPanel />
      </div>
    </div>
  );
};

export default Page;
